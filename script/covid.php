<?php
/*
Template Name: Corella - Informative Theme
*/


try {
	if(!empty($_POST['data']) && $_POST['data'] == 'US_Complete')
	{
		$dzRes['status'] = 0;
		$dzRes['msg'] = 'Something is wrong, Please wait.';
		
		/* Get Us Complete Coronavirus cases data */
		$url = 'https://covidtracking.com/api/v1/us/current.json';
		
		$data = file_get_contents($url);
		
		if(!empty($data))
		{
			$dzRes['status'] = 1;
			$data = json_decode($data);
			$dzRes['positive'] = !empty($data[0]->positive)?$data[0]->positive:0;
			$dzRes['death'] = !empty($data[0]->death)?$data[0]->death:0;
			$dzRes['recovered'] = !empty($data[0]->recovered)?$data[0]->recovered:0; 
		}
		
		echo json_encode($dzRes);
		exit;
	}
	
	if(!empty($_POST['data']) && $_POST['data'] == 'Countries_Data')
	{
		$dzRes['status'] = 0;
		$dzRes['msg'] = 'Something is wrong, Please wait.';
		
		/* Get Us Complete Coronavirus cases data */
		$url = 'https://api.covid19api.com/summary';
		
		$data = file_get_contents($url);
		
		if(!empty($data))
		{
			$result = array();
			$dzRes['status'] = 1;
			$data = json_decode($data);
			
			foreach($data->Countries as $data->Country)
			{
				
				$result[$data->Country->CountryCode]['confirmed'] = $data->Country->TotalConfirmed;
				$result[$data->Country->CountryCode]['death'] = $data->Country->TotalDeaths;
				$result[$data->Country->CountryCode]['recovered'] = $data->Country->TotalRecovered;
			}
			
			$dzRes['data'] = $result;
		}
		echo json_encode($dzRes);
		exit;
	}
	
	if(!empty($_POST['data']) && $_POST['data'] == 'Countries_Top_Stats')
	{
		$dzRes['status'] = 0;
		$dzRes['msg'] = 'Something is wrong, Please wait.';
		
		/* Get Us Complete Coronavirus cases data */
		$url = 'https://corona.lmao.ninja/v2/countries';
		
		$data = file_get_contents($url);
		
		if(!empty($data))
		{
			$result = array();
			$dzRes['status'] = 1;
			$data = json_decode($data);
			
			$sort_top_cases = $sort_today_cases = $sort_top_deaths = $sort_today_deaths = $sort_top_actives = $sort_top_recover = $data;
			
			usort($sort_top_cases, "sort_top_cases");
			usort($sort_today_cases, "sort_today_cases");
			usort($sort_top_deaths, "sort_top_deaths");
			usort($sort_today_deaths, "sort_today_deaths");
			usort($sort_top_actives, "sort_top_actives");
			usort($sort_top_recover, "sort_top_recover");
			
			$result['top_cases']	= array_slice($sort_top_cases, 0, 10);
			$result['today_cases']	= array_slice($sort_today_cases, 0, 10);
			$result['top_deaths']	= array_slice($sort_top_deaths, 0, 10);
			$result['today_deaths']	= array_slice($sort_today_deaths, 0, 10);
			$result['top_active'] 	= array_slice($sort_top_actives, 0, 10);
			$result['top_recover']	= array_slice($sort_top_recover, 0, 10);
			
			$dzRes['data'] = $result;
		}
		echo json_encode($dzRes);
		exit;
	}
	
	if(!empty($_POST['data']) && $_POST['data'] == 'Countries_Corona_Info')
	{
		$dzRes['status'] = 0;
		$dzRes['msg'] = 'Something is wrong, Please wait.';
		
		/* Get Us Complete Coronavirus cases data */
		if(!empty($_POST['country_code']))
		{
			$url = 'https://corona.lmao.ninja/v2/countries/'.$_POST['country_code'];
		}else{
			$url = 'https://corona.lmao.ninja/v2/countries';	
		}
		
		
		
		$data = file_get_contents($url);
		
		if(!empty($data))
		{
			$result = array();
			$dzRes['status'] = 1;
			$data = json_decode($data);
			$dzRes['data'] = $data;
		}
		echo json_encode($dzRes);
		exit;
	}
	
} catch (\Exception $e) {
    $dzRes['status'] = 0;
	$dzRes['msg'] = $e->getMessage().'Some problem in API, please try again later.';
	echo json_encode($dzRes);
	exit;
}

function pr($value)
{
	echo '<pre>';
	print_r($value);
	echo '</pre>';
}

function sort_top_cases($a,$b) 
  { 
	return ($a->cases < $b->cases) ? 1 : -1; 
  }
function sort_today_cases($a,$b) 
  {
    return ($a->todayCases < $b->todayCases) ? 1 : -1;
  }
function sort_top_deaths($a,$b) 
  {
    return ($a->deaths < $b->deaths) ? 1 : -1;
  }
function sort_today_deaths($a,$b) 
  {
    return ($a->todayDeaths < $b->todayDeaths) ? 1 : -1;
  }
function sort_top_actives($a,$b) 
  {
    return ($a->active < $b->active) ? 1 : -1;
  }
function sort_top_recover($a,$b) 
  {
    return ($a->recovered < $b->recovered) ? 1 : -1;
  }

