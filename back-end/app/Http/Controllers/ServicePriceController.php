<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServicePrice;
use App\Models\Iphone;
use App\Models\RepairService;


class ServicePriceController extends Controller
{
    // Display a listing of service prices
    public function index()
    {
        $servicePrices = ServicePrice::with(['iphone', 'repairService'])->get();
        return response()->json($servicePrices);
    }

    // Show the form for creating a new service price
    public function create()
    {
        // Return a view to create a new service price
    }

    // Store a newly created service price in storage
    public function store(Request $request)
    {
        // Look up the iPhone model ID
        $iphone = Iphone::where('model', $request->input('iphone_model'))->first();
        // Look up the repair service ID
        $repairService = RepairService::where('service_name', $request->input('repair_service_name'))->first();
    
        if (!$iphone || !$repairService) {
            return response()->json(['error' => 'Invalid iPhone model or repair service name'], 400);
        }
    
        // Create a new ServicePrice entry with the found IDs
        $servicePrice = new ServicePrice();
        $servicePrice->iphone_id = $iphone->id;
        $servicePrice->repair_service_id = $repairService->id;
        $servicePrice->price = $request->input('price');
        $servicePrice->save();
    
        return response()->json($servicePrice, 201);
    }

    // Display the specified service price
    public function show($id)
    {
        $servicePrice = ServicePrice::with(['iphone', 'repairService'])->find($id);
        if ($servicePrice) {
            return response()->json($servicePrice);
        } else {
            return response()->json(['error' => 'Service price not found'], 404);
        }
    }

    // Show the form for editing the specified service price
    public function edit($id)
    {
        // Return a view to edit an existing service price
    }

    // Update the specified service price in storage
    // method post
    // http://127.0.0.1:8000/api/set-price/1?_method=PATCH
    public function update(Request $request)
    {
        // Look up the iPhone model ID
        $iphone = Iphone::where('model', $request->input('iphone_model'))->first();
        // Look up the repair service ID
        $repairService = RepairService::where('service_name', $request->input('repair_service_name'))->first();
    
        if (!$iphone || !$repairService) {
            return response()->json(['error' => 'Invalid iPhone model or repair service name'], 400);
        }
    
        // Find the existing ServicePrice entry using the iPhone model ID and repair service ID
        $servicePrice = ServicePrice::where('iphone_id', $iphone->id)
                                    ->where('repair_service_id', $repairService->id)
                                    ->first();
        if (!$servicePrice) {
            return response()->json(['error' => 'Service price not found'], 404);
        }
    
        // Update the ServicePrice entry with the new price
        $servicePrice->price = $request->input('price');
        $servicePrice->save();
    
        return response()->json($servicePrice);
    }
    

    // Remove the specified service price from storage
    public function destroy($id)
    {
        $servicePrice = ServicePrice::find($id);
        if ($servicePrice) {
            $servicePrice->delete();
            return response()->json(['message' => 'Service price deleted successfully']);
        } else {
            return response()->json(['error' => 'Service price not found'], 404);
        }
    }

    public function getServicePrice(Request $request)
    {
        $iphoneModel = $request->input('iphone_model');
        // Ensure that $repairServiceNames is an array, even if it's empty or null
        $repairServiceNames = $request->input('repair_service_names', []);
    
        // Check if $repairServiceNames is an array and not empty
        if (is_array($repairServiceNames) && count($repairServiceNames) > 0) {
            $totalPrice = ServicePrice::whereHas('iphone', function ($query) use ($iphoneModel) {
                $query->where('model', $iphoneModel);
            })->whereIn('repair_service_id', function ($query) use ($repairServiceNames) {
                $query->select('id')
                      ->from('repair_services')
                      ->whereIn('service_name', $repairServiceNames);
            })->sum('price');
    
            if ($totalPrice > 0) {
                return response()->json(['total_price' => $totalPrice]);
            } else {
                return response()->json(['error' => 'Service prices not found'], 404);
            }
        } else {
            return response()->json(['error' => 'No repair services provided'], 400);
        }
    }
    
    

}
