<?php

if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
    // Get the data as string 
    $rawImage=$GLOBALS['HTTP_RAW_POST_DATA'];

    // Remove headers  
    $removeHeaders=substr($rawImage, strpos($rawImage, ",")+1); //throw away everyting before comma
    // decode it from base 64 and into image data only
    $decode=base64_decode($removeHeaders);
    $fopen = fopen('ims/myImage.png' , 'wb' );
    fwrite( $fopen, $decode);
    fclose( $fopen );
}
?>