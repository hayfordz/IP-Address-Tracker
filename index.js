 

const secretApi = 'at_jpadBK82splDO8kd9dBcA0v6A7g5P'
const apiurl = 'https://geo.ipify.org/api/'
let current_version = 'v1'

const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'

const headers_option = {
     headers: {
       'Access-Control-Allow-Origin': '*',
   }
 }

// Elements  from HTML

let currentIp = document.getElementById('current-ip')
let currentTown = document.getElementById('current-town')
let currentZone = document.getElementById('current-zone')
let currentIsp= document.getElementById('current-isp')

const enteredIp = document.getElementById('ip-address')
const searchBtn = document.getElementById('search-btn')


// creating a tile layer for the map
const myMap = L.map('mapid', {
    'center':[0,0],
    'zoom': 0,
    'layers':[
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
    ]
 })

const update_marker = [51.505, -0.09]

updateMarker = (update_marker) =>{
myMap.setView(update_marker, 13);
L.marker(update_marker).addTo(myMap);
}

getIPDetails = (default_ip) =>{
    if(default_ip ==undefined){
        let ip_url = `${bypass_cors_url}${apiurl}${current_version}?apiKey=${secretApi}`
    }
    else{
        let ip_url = `${bypass_cors_url}${apiurl}${current_version}?apiKey=${secretApi}&ipAddress=${default_ip}`
    }

    fetch(ip_url, headers_option)
    .then(results => results.json())
    .then(data =>{
        currentIp.innerHTML=data.ip
        currentTown.innerHTML=`${data.location.city}${data.location.country}${data.location.postalCode}`
        currentZone.innerHTML=data.location.timezone
        currentIsp.innerHTML= data.isp

        updateMarker([data.location.lat,data.location.lng])

    })

    .catch(err=>{
        console.log(err.message)
    })

}

document.addEventListener('load', updateMarker())

searchBtn.addEventListener('click',e=>{
    e.preventDefault()
    if(enteredIp.value!='' && enteredIp.value!=null){
        getIPDetails(enteredIp.value)
        return
    }
    else{
        alert('Please enter a valid IP address')
    }
})











