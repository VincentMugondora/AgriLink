import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Phone, 
  Mail, 
  Calendar,
  Package,
  Truck,
  Shield
} from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const queryClient = useQueryClient()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`/api/products/${id}`)
      return response.data
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm({
    defaultValues: {
      quantity: 1,
      deliveryLocation: '',
      notes: ''
    }
  })

  const quantity = watch('quantity')

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const response = await axios.post('/api/orders', orderData)
      return response.data
    },
    onSuccess: () => {
      toast.success('Order placed successfully!')
      setShowOrderForm(false)
      reset()
      queryClient.invalidateQueries(['orders'])
      navigate('/orders')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to place order')
    }
  })

  const onSubmit = (data) => {
    const orderData = {
      productId: product.id,
      sellerId: product.sellerId,
      quantity: data.quantity,
      deliveryLocation: data.deliveryLocation,
      notes: data.notes,
      totalAmount: (data.quantity * product.pricePerUnit).toFixed(2)
    }
    createOrderMutation.mutate(orderData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 mb-4">Product not found or error loading product.</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const totalPrice = quantity * product.pricePerUnit

  return (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="h-96 bg-gray-200 flex items-center justify-center text-6xl">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  '🌾'
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 bg-gray-200 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-green-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.grade === 'A' ? 'bg-green-100 text-green-800' : 
                product.grade === 'B' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                Grade {product.grade}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < (product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({product.reviewCount || 0} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-4xl font-bold text-green-600">
                  ${product.pricePerUnit}
                </span>
                <span className="text-gray-500 text-lg ml-2">per {product.unit}</span>
              </div>
              <p className="text-gray-600">
                {product.availableQuantity} {product.unit} available
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Harvest Date</h4>
                <p className="text-gray-600">
                  {product.harvestDate 
                    ? new Date(product.harvestDate).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Storage</h4>
                <p className="text-gray-600">{product.storageInstructions || 'Standard'}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Certification</h4>
                <p className="text-gray-600">{product.certification || 'None'}</p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {product.seller?.firstName?.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.seller?.firstName} {product.seller?.lastName}
                  </p>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-1" />
                    <span>{product.seller?.city}, {product.seller?.state}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-4">
                {product.seller?.phoneNumber && (
                  <a
                    href={`tel:${product.seller.phoneNumber}`}
                    className="flex items-center text-green-600 hover:text-green-700"
                  >
                    <Phone size={16} className="mr-1" />
                    Call
                  </a>
                )}
                <a
                  href={`mailto:${product.seller?.email}`}
                  className="flex items-center text-green-600 hover:text-green-700"
                >
                  <Mail size={16} className="mr-1" />
                  Email
                </a>
              </div>
            </div>

            {/* Order Section */}
            {user && user.id !== product.sellerId && (
              <div className="border-t pt-6">
                {!showOrderForm ? (
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center text-lg font-medium"
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Place Order
                  </button>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Place Your Order</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity ({product.unit})
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={product.availableQuantity}
                        {...register('quantity', {
                          required: 'Quantity is required',
                          min: { value: 1, message: 'Minimum quantity is 1' },
                          max: { 
                            value: product.availableQuantity, 
                            message: `Maximum available quantity is ${product.availableQuantity}` 
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      {errors.quantity && (
                        <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Location
                      </label>
                      <input
                        type="text"
                        {...register('deliveryLocation', { required: 'Delivery location is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your delivery address"
                      />
                      {errors.deliveryLocation && (
                        <p className="text-red-600 text-sm mt-1">{errors.deliveryLocation.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        {...register('notes')}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Any special delivery instructions or notes..."
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Unit Price:</span>
                        <span className="font-medium">${product.pricePerUnit}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{quantity} {product.unit}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowOrderForm(false)
                          reset()
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Features */}
            <div className="border-t pt-6 mt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Package size={24} className="text-green-500 mb-2" />
                  <span className="text-sm text-gray-600">Fresh Quality</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck size={24} className="text-green-500 mb-2" />
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield size={24} className="text-green-500 mb-2" />
                  <span className="text-sm text-gray-600">Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
