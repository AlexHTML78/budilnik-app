<?php
  $id= filter_input (INPUT_POST ,  'id' , FILTER_SANITIZE_STRING );
  $id=explode('_', $id);
  $itemid=mysql_real_escape_string($id[0]);
  $itempole=mysql_real_escape_string($id[1]);
  $content = $_POST['content'];
	if ($content) {
    print $content;
  }
  else 
    print '№1';
?>