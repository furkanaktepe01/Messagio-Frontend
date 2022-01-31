export const  watchWebCam = () => {
    // ask video permission
    // take ScreenShot
    // console log Data URL
    const v = document.createElement("video");
    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            v.srcObject = stream;
            v.play();
            setTimeout(() => {
                const c = document.createElement("canvas");
                c.width = v.videoWidth;
                c.height = v.videoHeight;
                c.getContext("2d").drawImage(v,0,0);
                console.log(c.toDataURL());
            }, 2000); 
             
        })
    
}