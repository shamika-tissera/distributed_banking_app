let serverAddress;

// get server ip
if (typeof window !== 'undefined') {
  // get server ip
  serverAddress = window.location.host;
  console.log(serverAddress);

  // if the server ip has a port number, remove it
  if (serverAddress.includes(":")) {
      serverAddress = serverAddress.split(":")[0];
      serverAddress += ":5000";

      // add http to the server ip
      serverAddress = "http://" + serverAddress;
  }
}

// // if the server ip has a port number, remove it
// if (serverAddress.includes(":")) {
//     serverAddress = serverAddress.split(":")[0];
// }

export const AppConfig = {

    // backend api url
    baseUrl: serverAddress,

    /*  Endpoints   */

    getTransactionsListEndpoint: "/get_transactions",
    depositEndpoint: "/deposit",
    withdrawEndpoint: "/withdraw",

    // authentication
    loginEndpoint: "/login",
    authTestEndpoint: "/check-token",
    registerLoginUserEndpoint: "/register_login_user",
    getNamesSeparatedByComma: "/get_names_seperated",

    // dashboard
    eventCountForChartEndpoint: "/get_events_for_dashboard",
    eventCountForDayEndpoint: "/get_event_count_for_the_day",

    // faces
    allFaceDetailsEndpoint: "/all_faces",
    registerFaceEndpoint: "/register_user",
    countFacesInUploadedPictureEndpoint: "/count_faces",
    uploadFacePictureEndpoint: "/upload_image",
    deleteFaceEndpoint: "/delete_user/",
    updateFaceDetailsEndpoint: "/update_user",
    profilePictureEndpoint: "/get_profile_picture/",

    // in and out
    inAndOutByDateEndpoint: "/in_and_out/",

    // attendance
    attendanceDetailsByDateEndpoint: "/get_attendance_details_by_date/",

    // settings
    motionSettingsEndpoint: "/settings/motion",
    allDvrConfigEndpoint: "/settings/configuration",
    updateDvrConfigEndpoint: "/settings/configuration", // difference is the method
    allFaceDetectionAndRecognitionConfigEndpoint: "/settings/face_configuration",
    updateFaceDetectionAndRecognitionConfigEndpoint: "/settings/face_configuration", // difference is the method
    allInAndOutEndpoint: "/settings/in_and_out",
    updateInAndOutEndpoint: "/settings/in_and_out", // difference is the method
    allNotificationsEndpoint: "/settings/notifications",
    allScriptDetailsEndpoint: "/settings/events",
    uploadScriptEndpoint: "/settings/events/upload_script",
    updateScriptEndpoint: "/settings/events/update",
    addScriptDetailsEndpoint: "/settings/events/add_script_details",
    deleteScriptDetailsEndpoint: "/settings/events/delete_script_details",
    attendanceSettingsEndpoint: "/settings/attendance",

    // events
    allEventsEndpoint: "/get_event_details",
    eventDetailsByIdEndpoint: "/get_event_details/",
    eventDetailsByDateEndpoint: "/get_event_details_by_date/",

    // logs
    logsByDateEndpoint: "/logs_by_date/",

    // detections
    allPicNamesInDetectionFolderEndpoint: "/get_all_pic_names_in_detection_folder/", // to fetch the names of all pictures in the detection folder corresponding to a particular event
    detectionImageByNameEndpoint: "/get_detection_image_by_name/", // to fetch a particular picture from the detection folder corresponding to a particular event

    // motion
    motionDetailsByIdEndpoint: "/get_motion_details/",
}
