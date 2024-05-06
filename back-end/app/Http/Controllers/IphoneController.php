<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Iphone;
use App\Models\RepairService;
use App\Models\ServicePrice;
use DB;

class IphoneController extends Controller
{
    // Display a listing of iPhones
    public function index()
    {
        $iphones = Iphone::all();
        return response()->json($iphones);
    }

    // Show the form for creating a new iPhone
    public function create()
    {
        // Return a view to create a new iPhone
    }

    // Store a newly created iPhone in storage
    public function store(Request $request)
    {
        // $iphone = new Iphone();
        // $iphone->model = $request->model;
        // $iphone->save();

        // return response()->json($iphone, 201);
    }

    // Display the specified iPhone
    public function show($id)
    {
        $iphone = Iphone::find($id);
        if ($iphone) {
            return response()->json($iphone);
        } else {
            return response()->json(['error' => 'iPhone not found'], 404);
        }
    }

    // Show the form for editing the specified iPhone
    public function edit($id)
    {
        // Return a view to edit an existing iPhone
    }

    // Update the specified iPhone in storage
    public function update(Request $request, $id)
    {
        $iphone = Iphone::find($id);
        if ($iphone) {
            $iphone->model = $request->model;
            $iphone->save();
            return response()->json($iphone);
        } else {
            return response()->json(['error' => 'iPhone not found'], 404);
        }
    }

    // Remove the specified iPhone from storage based on the model in the request body
    public function destroy(Request $request)
    {
        $model = $request->input('model');
        if (!$model) {
            return response()->json(['error' => 'No iPhone model provided'], 400);
        }

        $iphone = Iphone::where('model', $model)->first();
        if ($iphone) {
            // Delete related service prices first
            $iphone->servicePrices()->delete();
            // Now delete the iPhone
            $iphone->delete();
            return response()->json(['message' => "iPhone model '{$model}' and related service prices deleted successfully"]);
        } else {
            return response()->json(['error' => "iPhone model '{$model}' not found"], 404);
        }
    }




    // save one new device with all its repair prices
    public function storeWithServices(Request $request)
    {

        $validatedData = $request->validate([
            'model' => 'required|string', // Validate that 'model' is required and is a string
            'services' => 'required|array', // Validate that 'services' is required and is an array
        ]);


        // Start a transaction to ensure data integrity
        DB::beginTransaction();
        try {
            // Create the new iPhone model
            $iphone = Iphone::create(['model' => $validatedData['model']]);

            // Iterate over the services and create the service prices
            foreach ($validatedData['services'] as $service_name => $price) {
                // Find or create the repair service
                $repairService = RepairService::firstOrCreate(['service_name' => $service_name]);

                // Create the service price
                ServicePrice::create([
                    'iphone_id' => $iphone->id,
                    'repair_service_id' => $repairService->id,
                    'price' => $price
                ]);
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'iPhone and service prices added successfully'], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
