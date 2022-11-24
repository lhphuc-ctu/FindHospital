@extends('layouts.app')

@section('title')
 <title>Tìm kiếm địa điểm y tế</title>
@stop

@section('content')
  <div id="map">
    @include('layouts.nav')
  </div>
  <script src="/assets/js/map.js"></script>
@stop