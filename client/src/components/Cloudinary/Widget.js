import { useState } from 'react'
import ImageUpload from './ImageUpload'
import './Widget.css'
import CldGallery from './CldGallery'
import { Cloudinary } from '@cloudinary/url-gen'

function Widget() {
  const [imagesUploadedList, setImagesUploadedList] = useState([])

  const cld = new Cloudinary({
    cloud: {
      cloud_name: 'do6kan0iu', //Your cloud name
      upload_preset: 'etiquette', //Create an unsigned upload preset and update this
    },
  })

  const onImageUploadHandler = (publicId) => {
    setImagesUploadedList((prevState) => [...prevState, publicId])
  }

  return (
    <div className="Widget">
      <ImageUpload
        cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
        upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
        onImageUpload={(publicId) => onImageUploadHandler(publicId)}
      />
      <p>
        This mini project demonstrates the use of Upload widget +
        transformations on uploaded images in responsive way useing hooks in
        React
      </p>
      <CldGallery
        imagesUploaded={imagesUploadedList}
        {...cld}
        cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
      />
    </div>
  )
}

export default Widget
