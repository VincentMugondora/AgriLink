import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MapPin, Upload, X as XIcon } from 'lucide-react'

const ProductCreate = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isSeller = user?.role === 'farmer' || user?.role === 'trader'
  const [locLoading, setLocLoading] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState([])
  const [uploading, setUploading] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm()

  const onUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser')
      return
    }
    setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue('latitude', pos.coords.latitude.toFixed(6))
        setValue('longitude', pos.coords.longitude.toFixed(6))
        setLocLoading(false)
      },
      () => {
        toast.error('Unable to retrieve your location')
        setLocLoading(false)
      }
    )
  }

  const onSubmit = async (data) => {
    try {
      const manualUrls = data.imageUrls
        ? data.imageUrls.split(',').map(s => s.trim()).filter(Boolean)
        : []
      const images = [...uploadedUrls, ...manualUrls]

      const lat = parseFloat(data.latitude)
      const lng = parseFloat(data.longitude)

      if (Number.isNaN(lat) || Number.isNaN(lng)) {
        toast.error('Latitude and Longitude are required and must be numbers')
        return
      }

      const payload = {
        name: data.name,
        description: data.description || '',
        category: data.category,
        grade: data.grade,
        pricePerUnit: parseFloat(data.pricePerUnit),
        unit: data.unit,
        quantity: parseFloat(data.quantity),
        availableQuantity: parseFloat(data.availableQuantity || data.quantity),
        location: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        harvestDate: data.harvestDate || null,
        isOrganic: !!data.isOrganic,
        images,
        sellerId: user.id
      }

      await axios.post('/api/products', payload)
      toast.success('Product created successfully!')
      navigate('/products')
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create product'
      toast.error(msg)
    }
  }

  const onFilesSelected = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const formData = new FormData()
    files.forEach(f => formData.append('images', f))
    try {
      setUploading(true)
      const { data } = await axios.post('/api/uploads/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (Array.isArray(data?.urls)) {
        setUploadedUrls(prev => [...prev, ...data.urls])
        toast.success('Image(s) uploaded')
      } else {
        toast.error('Unexpected upload response')
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed'
      toast.error(msg)
    } finally {
      setUploading(false)
      e.target.value = '' // reset input
    }
  }

  if (!isSeller) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Not authorized</h1>
          <p className="text-gray-600 mb-6">Only farmers and traders can add new products.</p>
          <Link to="/products" className="text-green-600 hover:text-green-700 font-medium">
            Browse products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">Fill in the details below to list your product.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('name', { required: 'Product name is required' })}
                  placeholder="e.g., Fresh Tomatoes"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select category</option>
                  <option value="cereals">Cereals</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="tubers">Tubers</option>
                  <option value="legumes">Legumes</option>
                  <option value="livestock">Livestock</option>
                  <option value="poultry">Poultry</option>
                  <option value="dairy">Dairy</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('grade', { required: 'Grade is required' })}
                >
                  <option value="">Select grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                {errors.grade && <p className="text-red-600 text-sm mt-1">{errors.grade.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('unit', { required: 'Unit is required' })}
                >
                  <option value="">Select unit</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="tonne">tonne</option>
                  <option value="liter">liter</option>
                  <option value="piece">piece</option>
                  <option value="dozen">dozen</option>
                </select>
                {errors.unit && <p className="text-red-600 text-sm mt-1">{errors.unit.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Unit (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('pricePerUnit', { required: 'Price per unit is required', min: { value: 0, message: 'Must be >= 0' } })}
                  placeholder="e.g., 1.50"
                />
                {errors.pricePerUnit && <p className="text-red-600 text-sm mt-1">{errors.pricePerUnit.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Quantity</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('quantity', { required: 'Quantity is required', min: { value: 0, message: 'Must be >= 0' } })}
                  placeholder="e.g., 100"
                />
                {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('availableQuantity', { required: 'Available quantity is required', min: { value: 0, message: 'Must be >= 0' } })}
                  placeholder="e.g., 100"
                />
                {errors.availableQuantity && <p className="text-red-600 text-sm mt-1">{errors.availableQuantity.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('harvestDate')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
                {...register('description')}
                placeholder="Describe your product..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('latitude', { required: 'Latitude is required' })}
                  placeholder="e.g., -17.8252"
                />
                {errors.latitude && <p className="text-red-600 text-sm mt-1">{errors.latitude.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('longitude', { required: 'Longitude is required' })}
                  placeholder="e.g., 31.0530"
                />
                {errors.longitude && <p className="text-red-600 text-sm mt-1">{errors.longitude.message}</p>}
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={onUseMyLocation}
                  disabled={locLoading}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <MapPin size={18} className="mr-2" />
                  {locLoading ? 'Detecting…' : 'Use my location'}
                </button>
              </div>
            </div>

            {/* Images and options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input id="isOrganic" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" {...register('isOrganic')} />
                <label htmlFor="isOrganic" className="text-sm text-gray-700">Organic</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFilesSelected}
                  className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border border-gray-300 rounded-md"
                />
                {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
              </div>
            </div>

            {uploadedUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {uploadedUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img src={url} alt={`uploaded-${idx}`} className="w-full h-24 object-cover rounded-md border" />
                    <button
                      type="button"
                      onClick={() => setUploadedUrls(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-50"
                      aria-label="Remove image"
                    >
                      <XIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs (optional, comma-separated)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('imageUrls')}
                placeholder="https://... , https://..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </button>
              <Link to="/dashboard" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
