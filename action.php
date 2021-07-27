<?php

if(isset($_POST['action']) && $_POST['action'] == 'send_form_message') {
  sendMail();
}
else {
  $response = [
    'status'    => false,
    'error_message'   => 'There was an error sending your message. Please refrest and try again later',
  ];

  echo json_encode($response);
  return;
}

function sendMail() {
  $name = $_POST['data']['fullname'];
  $email = $_POST['data']['email'];
  $phonenumber = $_POST['data']['phonenumber'];
  $home_address = $_POST['data']['home_address'];
  $office_address = $_POST['data']['office_address'];


  //all fields compulsory
  //validations
  $err_msg = '';
  if(empty($name)) $err_msg .= '<p>Your fullname is required</p>';
  if(empty($email)) $err_msg .= '<p>Your email is required</p>';
  if(empty($phonenumber) || strlen($phonenumber) != 11) $err_msg .= '<p>Enter a valid phone number of 11 digits</p>';
  if(empty($home_address)) $err_msg .= '<p>Your home address is required</p>';
  if(empty($office_address)) $err_msg .= '<p>Your office address is required</p>';

  if(strlen($err_msg) > 5) {
    $response = [
      'status'    => false,
      'message'   => $err_msg,
    ];

    echo json_encode($response);
    return;
  }

  //validate email address
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)) $err_msg .= '<p>This email address is not valid</p>';

  //send email
  $to = 'shuttle@jvpulse.com';
  $subject = 'New User Sign Ups on JV Pulse Shuttle';
  $from = $email;
  $message = '<html><body><h2>Details Submitted: <h2><br>';
  $message .= '<p><b>Name:</b> '.$name. '</p>';
  $message .= '<p><b>Email:</b> '.$email.'</p>';
  $message .= '<p><b>Phone Number:</b> '.$phonenumber.'</p>';
  $message .= '<p><b>Home Address:</b> '.$home_address.'</p>';
  $message .= '<p><b>Office Address:</b> '.$office_address.'</p><br>';
  $message .= '<p><strong>Thank you.</strong></p></body></html>';


  // To send HTML mail, the Content-type header must be set
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
  $headers .= "From: JV Pulse Shuttle <no-reply@jvpulse-shuttle.techwithdee.com>" . "\r\n" .
  "Reply-To: $from" . "\r\n" .
  "X-Mailer: PHP/" . phpversion();

  try {                    
    if(mail($to, $subject, $message, $headers)) {
      $response = [
        'status'    => true,
        'message'   => '<p>Your request has been received. We will get back to you shortly</p>'
      ];

      echo json_encode($response);
      return;
    } else {
      $response = [
        'status'    => false,
        'message'   => '<p>Your request could not be sent. Please try again later.</p>'
      ];

      echo json_encode($response);
      return;
    }
    
  }
  catch(Exception $e) {
    $response = [
      'status'    => false,
      'message'   => $mail->ErrorInfo
    ];

    echo json_encode($response);
    return;
  }
  
}