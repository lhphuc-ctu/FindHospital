@extends('layouts.app')

@section('title')
 <title>Tìm kiếm địa điểm y tế</title>
@stop

@section('head')
<link rel="stylesheet" href="./assets/leaflet/leaflet.draw.css">
<script src="./assets/leaflet/leaflet.draw.js"></script>
<meta name="csrf-token" content="{{ csrf_token() }}" />
@stop

@section('content')
    @include('layouts.nav')
    @include('admin.info')
    @include('admin.addform')
    <div id="map"></div>
  <script src="/assets/js/admin.js"></script>
@stop