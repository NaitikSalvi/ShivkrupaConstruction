'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Search, Plus, Edit, Trash2, Download, Upload, Barcode, QrCode } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { QRCode } from 'antd';
// import Image from 'next/image'
import logo from "../../asset/QRicon.ico"
 
const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default function FileUploadList() {
    const [files, setFiles] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    
    const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [newFile, setNewFile] = useState({})
    const [newProduct, setNewProduct] = useState({
            ProductVideoUrl: null,
            ProductVideoName: "",
        })
    const [editingFile, setEditingFile] = useState(null)
    const [editingProduct, setEditingProduct] = useState(null)
    
    const [uploadedFile, setUploadedFile] = useState(null)
    const [videoUploadProgress, setVideoUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    
    const [openQRFile, setOpenQRFile] = useState(null)
    const [adddocLoader, setAddDocLoader] = useState(false)
    const [editLoader, setEditLoader] = useState(false)

    useEffect(() => {
        fetchFiles()
        fetchProducts()
    }, [])

    const fetchFiles = async () => {
        const apiendpoint = "http://59.144.126.25:90/TraceabilityAPI/api/ProductFileUpload/GetFileUploadsData"
        try {
            const response = await axios.post("/api/universal", { apiendpoint })
            setFiles(response.data.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching files:', error)
            setLoading(false)
            toast.error('Failed to fetch files')
        }
    }

    const fetchProducts = async () => {
        const apiendpoint = "http://59.144.126.25:90/TraceabilityAPI/api/ProductMaster/GetProductMaster"
        try {
            const response = await axios.post("/api/universal", { apiendpoint })
            const uniqueProducts = Array.from(new Set(response.data.data.map(JSON.stringify))).map(JSON.parse)
            setProducts(uniqueProducts)
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error('Failed to fetch products')
        }

    }

    const handleVideoUpload = async (file) => {
        if (file.size > 100 * 1024 * 1024) {
            toast.error("File size exceeds 100MB limit")
            return null
        }

        setVideoUploadProgress(0)
        setIsUploading(true)
        const timestamp = new Date().getTime()
        const uniqueFileName = `${timestamp}-${file.name}`

        try {
            const response = await put(`Sonapumps${uniqueFileName}`, file, {
                access: "public",
                token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
                onUploadProgress: (progress) => {
                    setVideoUploadProgress(Math.round((progress.loaded * 100) / progress.total))
                },
            })

            setIsUploading(false)
            return response
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to upload video")
            setIsUploading(false)
            return null
        }
    }
    const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo } = useDropzone({
            onDrop: async (acceptedFiles) => {
                const file = acceptedFiles[0]
                if (file) {
                    const videoUrl = await handleVideoUpload(file)
                    console.log(videoUrl)
                    if (videoUrl) {
                        const productUpdate = {
                            ProductVideoUrl: videoUrl.url,
                            ProductVideoName: videoUrl.pathname
                        }
    
                    
                            setEditingProduct(prev => ({ ...prev, ...productUpdate }))
                       
                            setNewProduct(prev => ({ ...prev, ...productUpdate }))
                 
                    }
                }
            },
            accept: { "video/*": [".mp4", ".mov", ".avi", ".webm"] },
            maxFiles: 1,
        })

        const handleVideoDelete = async (videoUrl) => {
            try {
                const response = await axios.post("/api/deleteVideo", { videoUrl })
    
                if (!response.data) {
                    throw new Error("Failed to delete video")
                }
    
                toast.success(response.data.message)
    
                if (editingProduct) {
                    setEditingProduct(prev => ({
                        ...prev,
                        ProductVideoUrl: null,
                        ProductVideoName: ""
                    }))
                } else {
                    setNewProduct(prev => ({
                        ...prev,
                        ProductVideoUrl: null,
                        ProductVideoName: ""
                    }))
                }
            } catch (error) {
                console.error("Error deleting video:", error.message)
                toast.error("Failed to delete video")
            }
        }


    const handleDownload = async (filePath, fileName) => {
       
        try {
            const response = await axios.get(`/api/download`, {
                params: { fileUrl: filePath, fileName: fileName },
                responseType: 'blob',
            })

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()
            toast.success('File downloaded successfully')
        } catch (error) {
            console.error('Error downloading file:', error)
            toast.error('Failed to download file')
        }
    }

    const handleDelete = async (fileId) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            const apiendpoint = "http://59.144.126.25:90/TraceabilityAPI/api/ProductFileUpload/DeleteProductFileUploads"
            const payload = {
                deleteProductMasterByIds: true,
                productMasterFileUploadsId: [fileId]
            }
            try {
                await axios.post("/api/universal", { apiendpoint, payload })
                fetchFiles()
                toast.success('File deleted successfully')
            } catch (error) {
                console.error('Error deleting file:', error)
                toast.error('Failed to delete file')
            }
        }
    }

    const handleAddNewFile = async () => {
        setAddDocLoader(true)
        if (!newFile.SerialNumber) {
            toast.error('Please enter the Serial Number');
            setAddDocLoader(false);
            return;
        }

        if (!newFile.ProductMasterId) {
            toast.error('Please select a Product Master ID');
            setAddDocLoader(false);
            return;
        }

        if (!uploadedFile) {
            toast.error('Please upload a file');
            setAddDocLoader(false);
            return;
        }

        const apiEndpoint = 'http://59.144.126.25:90/TraceabilityAPI/api/ProductFileUpload/AddProductFileUploads'

        try {
            const formData = new FormData()
            formData.append('SerialNumber', newFile.SerialNumber)

            const [ProductMasterId, ProductCode] = newFile.ProductMasterId.split('#')
            formData.append('ProductMasterId', ProductMasterId)
            formData.append('ProductCode', ProductCode)

            formData.append('ProductFiles', uploadedFile)
            formData.append('IsPublic', newFile.IsPublic || false)
            formData.append('IsServer', newFile.IsServer || true)

            await axios.post("/api/multipart", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiendpoint': apiEndpoint,
                },
            })

            setIsNewFileDialogOpen(false)
            setNewFile({})
            setUploadedFile(null)
            fetchFiles()
            toast.success('File added successfully')
        } catch (error) {
            console.error('Error adding new file:', error)
            toast.error('Failed to add new file')
        } finally {
            setAddDocLoader(false)
        }
    }

    const handleEdit = (file) => {

        // console.log("IHIJI",file)
        setEditingFile({
            ...file,
            IsPublic: file.ServerOrPublic === 'Public',
            IsServer: file.ServerOrPublic === 'Server',
        })
        setIsEditDialogOpen(true)
    }

    const handleSaveEdit = async () => {
        
        setEditLoader(true)
        if (!editingFile.SerialNumber || !editingFile.ProductCode) {
            toast.error('Please fill in all required fields')
            setEditLoader(false)
            return
        }

        const apiEndpoint = 'http://59.144.126.25:90/TraceabilityAPI/api/ProductFileUpload/UpdateProductFileUploads'

        try {
            const formData = new FormData()
            formData.append('ProductMasterFileUploadsId', editingFile.ProductMasterFileUploadsId)
            formData.append('SerialNumber', editingFile.SerialNumber)
            formData.append('ProductCode', editingFile.ProductCode)
            formData.append('ProductMasterId', editingFile.ProductMasterId)
            if (uploadedFile) {
                formData.append('ProductFiles', uploadedFile)
            }
            formData.append('IsPublic', editingFile.IsPublic)
            formData.append('IsServer', editingFile.IsServer)

            await axios.post("/api/multipart", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'apiendpoint': apiEndpoint,
                },
            })

            setIsEditDialogOpen(false)
            setEditingFile(null)
            setUploadedFile(null)
            fetchFiles()
            toast.success('File updated successfully')
        } catch (error) {
            console.error('Error updating file:', error)
            toast.error('Failed to update file')
        } finally {
            setEditLoader(false)
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1
    })
    
    const filteredFiles = files.filter(file =>
        file.SerialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.ProductCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Toaster position="top-right" />
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800">
                    <CardTitle className="text-2xl font-bold text-white">Document List</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative w-64">
                            <Input
                                type="text"
                                placeholder="Search files..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <Dialog open={isNewFileDialogOpen} onOpenChange={(open) => {

                            setIsNewFileDialogOpen(open)
                            if (!open) {
                                setNewFile({})
                                setUploadedFile(null)
                            }
                        }} >
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Plus className="mr-2 h-4 w-4" /> Add New File
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[725px]">
                                <DialogHeader>
                                    <DialogTitle>Add New File</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div>
                                        <Label htmlFor="serialNumber">Serial Number</Label>
                                        <Input
                                            id="serialNumber"
                                            value={newFile.SerialNumber || ''}
                                            onChange={(e) => setNewFile({ ...newFile, SerialNumber: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="productSelect">Product</Label>
                                        <Select onValueChange={(value) => setNewFile({ ...newFile, ProductMasterId: value })}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem key={product.ProductMasterId} value={`${product.ProductMasterId}#${product.ProductCode}`}>
                                                        {product.ProductCode} - {product.ProductName}-{product.ProductDescription}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>File</Label>
                                        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
                                            <input {...getInputProps()} />
                                            {isDragActive ? (
                                                <p>Drop the file here ...</p>
                                            ) : (
                                                <p>Drag & drop a file here, or click to select a file</p>
                                            )}
                                            {uploadedFile && <p className="mt-2 text-sm text-gray-500 max-w-sm">{uploadedFile.name}</p>}
                                        </div>
                                    </div>
                                    <ProductForm
                                        product={newProduct}
                                        // setProduct={setNewProduct}
                                        // users={users}
                                        // uploadedFile={uploadedFile}
                                        // uploadedImage={uploadedImage}
                                        // // uploadedVideo={uploadedVideo}
                                        // getRootPropsFile={getRootPropsFile}
                                        // getInputPropsFile={getInputPropsFile}
                                        // getRootPropsImage={getRootPropsImage}
                                        // getInputPropsImage={getInputPropsImage}
                                        getRootPropsVideo={getRootPropsVideo}
                                        getInputPropsVideo={getInputPropsVideo}
                                        videoUploadProgress={videoUploadProgress}
                                        isUploading={isUploading}
                                        onVideoDelete={handleVideoDelete}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isPublic"
                                            checked={newFile.IsPublic}
                                            onCheckedChange={(checked) => setNewFile({ ...newFile, IsPublic: checked })}
                                        />
                                        <label htmlFor="isPublic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Public
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isServer"
                                            checked={newFile.IsServer}
                                            onCheckedChange={(checked) => setNewFile({ ...newFile, IsServer: checked })}
                                        />
                                        <label htmlFor="isServer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Server Attachment
                                        </label>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={handleAddNewFile} disabled={adddocLoader} className='text-blue-800 hover:bg-blue-50 bg-blue-300'>
                                        {adddocLoader ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                Adding File ....
                                            </>
                                        ) : (
                                            'Add File'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-semibold text-gray-600">Product Code</TableHead>
                                        <TableHead className="font-semibold text-gray-600">Serial Number</TableHead>
                                        <TableHead className="font-semibold text-gray-600">Product Name</TableHead>
                                        <TableHead className="font-semibold text-gray-600">File Name</TableHead>
                                        <TableHead className="font-semibold text-gray-600">Status</TableHead>
                                        <TableHead className="font-semibold text-gray-600">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence>
                                        {filteredFiles.map((file) => (
                                            <motion.tr
                                                key={file.ProductMasterFileUploadsId}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <TableCell>{file.ProductCode}</TableCell>
                                                <TableCell className="font-medium">{file.SerialNumber}</TableCell>
                                                <TableCell>{file.ProductName}</TableCell>
                                                <TableCell>{file.ProductFiles}</TableCell>
                                                <TableCell>
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {file.ServerOrPublic}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50" onClick={() => handleDownload(file.ProductFilesPath, file.ProductFiles)}>
                                                            <Download className="h-4 w-4" />
                                                            Download
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50" onClick={() => handleEdit(file)}>
                                                            <Edit className="h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-purple-600 hover:bg-purple-50"
                                                            onClick={() => setOpenQRFile(file)}
                                                        >
                                                            <QrCode className="h-4 w-4 mr-2" />
                                                            QR
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(file.ProductMasterFileUploadsId)}>
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
            <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (!open) {
                        if (editingProduct?.ProductVideo && !products.find((p) => p.ProductVideo === editingProduct.ProductVideo)) {
                            handleVideoDelete(editingProduct.ProductVideo)
                        }
                    }
                }}>
                <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                        <DialogTitle>Edit File</DialogTitle>
                    </DialogHeader>
                   
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="editSerialNumber">Serial Number</Label>
                            <Input
                                id="editSerialNumber"
                                value={editingFile?.SerialNumber}
                                onChange={(e) => setEditingFile({ ...editingFile, SerialNumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="productSelect">Product</Label>
                            <Select
                                onValueChange={(value) => {
                                    const [productMasterId, productCode] = value.split('#')
                                    setEditingFile({
                                        ...editingFile,
                                        ProductMasterId: productMasterId,
                                        ProductCode: productCode
                                    })
                                }}
                                value={`${editingFile?.ProductMasterId}#${editingFile?.ProductCode}`}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map((product) => (
                                        <SelectItem
                                            key={product.ProductMasterId}
                                            value={`${product.ProductMasterId}#${product.ProductCode}`}
                                        >
                                            {product.ProductCode} - {product.ProductName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>File</Label>
                            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Drop the file here ...</p>
                                ) : (
                                    <p>Drag & drop a file here, or click to select a file</p>
                                )}
                                {uploadedFile && <p className="mt-2 text-sm text-gray-500 max-w-sm">{uploadedFile.name}</p>}
                                {!uploadedFile && <p className="mt-2 text-sm text-gray-500 max-w-sm">Current file: {editingFile?.ProductFiles}</p>}
                            </div>
                        </div>

                        {/* {editingProduct && ( */}
                        <ProductForm
                                        product={newProduct}
                                        // setProduct={setNewProduct}
                                        // users={users}
                                        // uploadedFile={uploadedFile}
                                        // uploadedImage={uploadedImage}
                                        // // uploadedVideo={uploadedVideo}
                                        // getRootPropsFile={getRootPropsFile}
                                        // getInputPropsFile={getInputPropsFile}
                                        // getRootPropsImage={getRootPropsImage}
                                        // getInputPropsImage={getInputPropsImage}
                                        getRootPropsVideo={getRootPropsVideo}
                                        getInputPropsVideo={getInputPropsVideo}
                                        videoUploadProgress={videoUploadProgress}
                                        isUploading={isUploading}
                                        onVideoDelete={handleVideoDelete}
                                    />
                                {/* )} */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="editIsPublic"
                                checked={editingFile?.IsPublic}
                                onCheckedChange={(checked) => setEditingFile({ ...editingFile, IsPublic: checked })}
                            />
                            <label htmlFor="editIsPublic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Public
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="editIsServer"
                                checked={editingFile?.IsServer}
                                onCheckedChange={(checked) => setEditingFile({ ...editingFile, IsServer: checked })}
                            />
                            <label htmlFor="editIsServer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Server Attachment
                            </label>
                        </div>
                    </div>
                 
                    <DialogFooter>
                        <Button type="submit" onClick={handleSaveEdit} className='text-blue-800 hover:bg-blue-50 bg-blue-300'>
                            {editLoader ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Saving Changes...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={Boolean(openQRFile)} onOpenChange={() => setOpenQRFile(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>QR Information</DialogTitle>
                    </DialogHeader>
                    {openQRFile && (
                        <div className="flex flex-col items-center space-y-4">
                            <div className=" ">
                                <QRCode
                                    errorLevel="H"
                                    size={400}
                                    iconSize={{ width: 70, height: 70 }}
                                    value={`https://sonapumps.vercel.app/?PC=${openQRFile.ProductCode}&SN=${openQRFile.SerialNumber}`}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    icon={logo.src}
                                />
                                {/* <QRCode
                                    size={256}
                                    viewBox="0 0 256 256"
                                    level="H"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-2 rounded-full">
                                        <Image
                                            src={logo}
                                            alt="Company Logo"
                                            width={200}
                                            height={48}
                                            className="rounded-full"
                                        />
                                    </div>
                                </div> */}

                            </div>
                            <div className="text-center">
                                <p><strong>ProductCode:</strong> {openQRFile.ProductCode}</p>
                                <p><strong>Serial No:</strong> {openQRFile.SerialNumber}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}


const ProductForm = ({
    product,
    getRootPropsVideo,
    getInputPropsVideo,
    videoUploadProgress,
    isUploading,
    onVideoDelete,
}) => {
    return (
        
        <div className="grid gap-4 py-4">
            
             
            {console.log("PRODUCT",product)}
            <div >
                <Label className="text-right">Product Video</Label>
                <div className="col-span-3">
                    {product?.ProductVideoUrl ? (
                        <div className="mt-2">
                            <video
                                src={product.ProductVideoUrl}
                                controls
                                className="w-full rounded-md"
                                style={{ maxHeight: "200px" }}
                            >
                                Your browser does not support the video tag.
                            </video>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 text-red-600 hover:bg-red-50"
                                onClick={() => onVideoDelete(product.ProductVideoUrl)}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Video
                            </Button>
                        </div>
                    ) : (
                        <div
                            {...getRootPropsVideo()}
                            className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
                        >
                            <input {...getInputPropsVideo()} />
                            <p>Drag & drop a video here, or click to select a video</p>
                            <p className="text-sm text-gray-500 mt-2">Maximum file size: 100MB</p>
                        </div>
                    )}
                    {isUploading && (
                        <div className="mt-2">
                            <Progress value={videoUploadProgress} className="w-full" />
                            <p className="text-sm text-gray-500 mt-1">
                                Uploading ({videoUploadProgress.toFixed(0)}%)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



// const ProductForm = ({
//     product,
//     getRootPropsVideo,
//     getInputPropsVideo,
//     videoUploadProgress,
//     isUploading,
//     onVideoDelete,
// }) => {
//     return (

//         <div className="grid gap-4 py-4">

//             {console.log("PRODUCT",product)}
//             <div >
//                 <Label className="text-right">Product Video</Label>
//                 <div className="col-span-3">
//                     {product?.ProductVideoUrl ? (
//                         <div className="mt-2">
//                             <video
//                                 src={product.ProductVideoUrl}
//                                 controls
//                                 className="w-full rounded-md"
//                                 style={{ maxHeight: "200px" }}
//                             >
//                                 Your browser does not support the video tag.
//                             </video>
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 className="mt-2 text-red-600 hover:bg-red-50"
//                                 onClick={() => onVideoDelete(product.ProductVideoUrl)}
//                             >
//                                 <Trash2 className="h-4 w-4 mr-2" />
//                                 Delete Video
//                             </Button>
//                         </div>
//                     ) : (
//                         <div
//                             {...getRootPropsVideo()}
//                             className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
//                         >
//                             <input {...getInputPropsVideo()} />
//                             <p>Drag & drop a video here, or click to select a video</p>
//                             <p className="text-sm text-gray-500 mt-2">Maximum file size: 100MB</p>
//                         </div>
//                     )}
//                     {isUploading && (
//                         <div className="mt-2">
//                             <Progress value={videoUploadProgress} className="w-full" />
//                             <p className="text-sm text-gray-500 mt-1">
//                                 Uploading ({videoUploadProgress.toFixed(0)}%)
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }
