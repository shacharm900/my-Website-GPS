window.addEventListener("DOMContentLoaded", function () {

    //הוספת מאזין לאירוע לחיצה
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);
    let latitude;
    let longitude;

    function geoFindMe() {

        const status = document.getElementById("status");
        const mapLink = document.getElementById("map-link");
        const iframe = document.getElementById("iframe");


        mapLink.href = '';
        mapLink.textContent = '';

        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            status.textContent = '';
            mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            iframe.classList.remove("d-none");
            iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'מציאת מיקום לא נתמך בדפדפן שלך';
        } else {
            status.textContent = 'מאתר את מיקומך..';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    function share() {
        if (navigator.share) {
            navigator.share({
                title: 'המיקום שלי',
                url: `https://maps.google.com/?q=${latitude},${longitude}`
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    }
});