
import { useEffect } from 'react';
import Card from '../Card';
import { useState } from 'react';
import axios from 'axios';
function CarList(){

  const [data,setData] =useState([]);
    const taxicars = [
        {
          id: 1,
          brand: "Volkswagen",
          rating: 112,
          carName: "Volkswagen Virtus",
          imgUrl: 'images/taxi1.jpg',
          model: "Model 3",
          price: 8000,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labore"
        },
      
        {
          id: 2,
          brand: "Toyota",
          rating: 102,
          carName: "Toyota Etios",
          imgUrl: 'images/taxi1.jpg',
          model: "Model-2022",
          price: 5000,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labore"
        } ,
      
        {
          id: 3,
          brand: "Skoda",
          rating: 132,
          carName: " Skoda Rapid",
          imgUrl: 'images/taxi1.jpg',
          model: "Model-2022",
          price: 6500,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labore."
        },
      
        {
          id: 4,
          brand: "Nissan",
          rating: 102,
          carName: "Nissan Magnite",
          imgUrl:'images/taxi1.jpg',
          model: "Model-2022",
          price: 7000,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labore"
        },
      
        {
          id: 5,
          brand: "Ferrari",
          rating: 94,
          carName: "Ferrari Camry",
          imgUrl: 'images/taxi1.jpg',
          model: "Model-2022",
          price: 4500,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:"lorem"
        },
      
        {
          id: 6,
          brand: "Mercedes",
          rating: 119,
          carName: "Mercedes Benz",
          imgUrl: 'images/taxi1.jpg',
          model: "Model-2022",
          price: 8500,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labo"
      
        },
      
        {
          id: 7,
          brand: "Audi",
          rating: 82,
          carName: "Audi Fiesta",
          imgUrl: 'images/taxi1.jpg',
          model: "Model 3",
          price: 5000,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labore"
        },
      
        {
          id: 8,
          brand: "Colorado",
          rating: 52,
          carName: "Rolls Royce",
          imgUrl: 'images/taxi1.jpg',
          model: "Model 3",
          price: 5000,
          speed: "20kmpl",
          gps: "GPS Navigation",
          seatType: "Heated seats",
          automatic: "Automatic",
          description:
            " Dolor labore lorem no accusam sit justo sadipscing labore"
        },
      ];


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/carlist/");
            console.log(response.data);
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
      }, []);
      

    return(
        <>

<div style={{display:"flex", flexWrap:"wrap", gap:"10px"}}>
{taxicars.map((elements) => (
        <Card
          key={elements.id} // Don't forget to add a unique key prop when mapping
          item={{
            id: elements.id,
            brand: elements.brand,
            carName: elements.carName,
            imgUrl: elements.imgUrl,
            model: elements.model,
            price: elements.price,
            speed: elements.speed,
            gps: elements.gps,
            seatType: elements.seatType,
            automatic: elements.automatic,
            description: elements.description
          }}
        />
      ))}
         </div>

         <div style={{display:"flex", flexWrap:"wrap", gap:"10px"}}>
          {data.map((el)=>{return(
            <Card
           // Don't forget to add a unique key prop when mapping
            item={{
             
              carName: el.carName,
              
              model: el.carModel,
             
            }}
          />
          )})}
         </div>
        </>
    )
}
export default CarList