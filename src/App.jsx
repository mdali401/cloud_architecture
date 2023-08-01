import { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import './App.css'

const ERASER_CODE =
  `API gateway [icon: aws-api-gateway]
  Lambda [icon: aws-lambda]
  S3 [icon: aws-simple-storage-service]
  VPC Subnet [icon: aws-vpc]{
    Main Server {
      Server [icon: aws-ec2]
      Data [icon: aws-rds]
    }
    Queue [icon: aws-auto-scaling]
    Compute Nodes [color: red] {
      Worker1 [icon: aws-ec2]
      Worker2 [icon: aws-ec2]
      Worker3 [icon: aws-ec2]
    }
  }
  Analytics [icon: aws-redshift]

  API gateway > Lambda > Server > Data
  Server > Queue > Worker1, Worker2, Worker3
  S3 < Data
  Compute Nodes > Analytics`

function App() {
  const [image, setImage] = useState();
  const [isImageLoading, setIsImageLoading] = useState();

  useEffect(() => {
    setIsImageLoading(true);
    getImageFromEraser()
      .then(imageUrl => {
        setImage(imageUrl);
        setIsImageLoading(false);
      })
      .catch(() => {
        setIsImageLoading(false);
      })
  }, [])

  const getImageFromEraser = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer LaX0WJFUj0gnyoVapuYz'
      },
      body: JSON.stringify({
        text: ERASER_CODE,
      })
    };
    
    return fetch('/target/api/render/prompt', options)
      .then(response => response.json())
      .then(response => response.imageUrl)
      .catch(err => err);
  }
  

  return (
    <>
      { image ? <img 
          src={image} 
          alt="cloud-architecture"
          style={{
            width: '100%',
            maxHeight: '90vh'
          }} 
        />
        :
        <ClipLoader
          color="FFFFFF"
          loading={isImageLoading}
          size={150}
          aria-label="Loading Spinner"
        />
      }
    </>
  )
}

export default App
