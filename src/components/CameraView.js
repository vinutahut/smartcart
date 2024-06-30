// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const CameraView = ({ updateCart }) => {
//   const videoRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);

//   useEffect(() => {
//     const startVideo = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         setStreaming(true);
//       } catch (error) {
//         console.error('Error accessing webcam:', error);
//       }
//     };

//     startVideo();
//   }, []);

//   useEffect(() => {
//     if (!streaming) return;

//     const interval = setInterval(async () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       const dataURL = canvas.toDataURL('image/jpeg');

//       try {
//         const response = await axios.post('/api/detect', { image: dataURL }, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const detectedObjects = response.data.predictions;
//         updateCart(detectedObjects);
//         console.log('Detected objects:', response.data);
//       } catch (error) {
//         console.error('Error detecting objects:', error.message);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [streaming]);

//   return (
//     <div>
//       <video ref={videoRef} style={{ width: '100%' }} />
//     </div>
//   );
// };

// export default CameraView;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { dbInventory } from '../firebaseConfig'; // Assuming you have initialized Firebase Firestore
import { collection, query, where, getDocs } from "firebase/firestore";


const CameraView = ({ updateCart }) => {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startVideo();
  }, []);

  useEffect(() => {
    if (!streaming) return;

    const interval = setInterval(async () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL('image/jpeg');

      try {
         const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/billing-system/2",
        params: {
            api_key: "CSC6NWlRmHGQf2qUVPIL"
        },
        data: dataURL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }}
    );
    console.log(response.data);
    // res.json(response.data);

        // const response = await axios.post('/api/detect', { image: dataURL }, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
        const detectedObjects = response.data.predictions;
        
        // this is demo prediction
        const detectedObject = [
          {
              "x": 320.5,
              "y": 246.5,
              "width": 631,
              "height": 467,
              "confidence": 0.43707746267318726,
              "class": "kissan-tomatoketchup-200",
              "class_id": 136,
              "detection_id": "496f170b-26dc-413a-9f17-d76ce0375f58"
          },
          {
            "x": 320.5,
            "y": 246.5,
            "width": 631,
            "height": 467,
            "confidence": 0.43707746267318726,
            "class": "lemon",
            "class_id": 136,
            "detection_id": "496f170b-26dc-413a-9f17-d76ce0375f58"
        },
        {
          "x": 320.5,
          "y": 246.5,
          "width": 631,
          "height": 467,
          "confidence": 0.43707746267318726,
          "class": "lemon",
          "class_id": 136,
          "detection_id": "496f170b-26dc-413a-9f17-d76ce0375f58"
      }
      ];

        // Fetch product details from Firestore for each detected object
        const productsWithDetails = await Promise.all(
          detectedObject.map(async (obj) => {
            try {
              const q = query(collection(dbInventory, "products"), where("class", "==", obj.class));

              const querySnapshot = await getDocs(q);
              // const productsRef = collection(db, "products")
              // const querySnapshot = await productsRef
              //   .where('class', '==', obj.class) // Match based on prediction class value
              //   // .where('name', '==', obj.name) // Alternatively, match based on product name
              //   .get();

              if (!querySnapshot.empty) {
                // Assuming only one product matches each classValue
                const product = querySnapshot.docs[0].data();
                return product;
              } else {
                console.warn(`Product matching class value ${obj.class} not found in Firestore`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching product details for class ${obj.class}:`, error);
              return null;
            }
          })
        );

        // Filter out null entries (failed Firestore fetches)
        const validProducts = productsWithDetails.filter((product) => product !== null);

        updateCart(validProducts);
        console.log('Detected objects with details:', validProducts);
      } catch (error) {
        console.error('Error detecting objects:', error.message);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [streaming]);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
    </div>
  );
};

export default CameraView;
