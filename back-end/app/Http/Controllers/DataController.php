<?php

namespace App\Http\Controllers;

use App\Models\Iphone;
use App\Models\RepairService;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function getAllData()
    {
        $iphoneModels = Iphone::all()->pluck('model');
        $repairServiceNames = RepairService::all()->pluck('service_name');

        return response()->json([
            'iphone_models' => $iphoneModels,
            'repair_service_names' => $repairServiceNames
        ]);
    }
}
