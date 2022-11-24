<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeoController extends Controller
{
    public function getGeo(Request $request)
    {
        $sql = $request->input('q');
        $format = $request->input('format');

        $data = DB::select($sql);

        if ($format == "GeoJSON"){
            $geojson = array(
                'type' => 'FeatureCollection',
                'features' => array()
            );
    
            $geo = new \geoPHP();
            $mapper = new \Spinen\Geometry\Support\TypeMapper();
            $geometry = new \Spinen\Geometry\Geometry($geo, $mapper);
    
            foreach ($data as $item){
                if(empty($item->dis_km)){
                    $feature = array(
                        'type' => 'Feature',
                        'properties' => array(
                            'id' => $item->Id,
                            'name' => $item->name
                        ),
                        'geometry' => $geometry->parseWkt($item->wkt)->toArray()
                    );
                }
                else
                {
                    $feature = array(
                        'type' => 'Feature',
                        'properties' => array(
                            'id' => $item->Id,
                            'name' => $item->name,
                            'dis_km' => $item->dis_km
                        ),
                        'geometry' => $geometry->parseWkt($item->wkt)->toArray()
                    );
                }
    
                array_push($geojson['features'], $feature);
            }

            return $geojson;
        }
        else return json_encode($data);
    }

    public function setGeo(Request $request)
    {
        $sql = $request->input('q');
        $res = DB::insert($sql);
        return $res;
    }

    public function deleteGeo(Request $request)
    {
        $sql = $request->input('q');
        $res = DB::delete($sql);
        return $res;
    }
}
