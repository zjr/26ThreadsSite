<?php

require_once('vimeo.php');

function set_privacy ($id='') {	
	$go = false;
	$vimeo = new phpVimeo(
		'fdbb433dd92a24d6c1639ae432f9767241187526',
		'99dd5620c17cd9ca9655177e6cf412721b5013c0',
		'55df9f2394a00471cb377fdcd39beda8',
		'295a39279e0089f25f8adea6d6b9474f99f955dd'
	);
	$info = $vimeo->call('vimeo.videos.getInfo', array(
		'video_id' => $id)
	);
	$info = $info->video[0];
	if ($info->privacy !== 'anybody') {
		$privacy = $vimeo->call('vimeo.videos.setPrivacy', array(
			'video_id' => $id,
			'privacy' => 'anybody')
		);
		$go = ($privacy->stat == 'ok') ? true : false;
	} else {
		$go = true;
	}
	return $go;
}

$id = $_POST['id'];
set_privacy($id);

?>
