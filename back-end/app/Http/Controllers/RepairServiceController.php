<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RepairService;

class RepairServiceController extends Controller
{
    // Display a listing of repair services
    public function index()
    {
        $repairServices = RepairService::all();
        return response()->json($repairServices);
    }

    // Show the form for creating a new repair service
    public function create()
    {
        // Return a view to create a new repair service
    }

    // Store a newly created repair service in storage
    public function store(Request $request)
    {
        $repairService = new RepairService();
        $repairService->service_name = $request->service_name;
        $repairService->save();

        return response()->json($repairService, 201);
    }

    // Display the specified repair service
    public function show($id)
    {
        $repairService = RepairService::find($id);
        if ($repairService) {
            return response()->json($repairService);
        } else {
            return response()->json(['error' => 'Repair service not found'], 404);
        }
    }

    // Show the form for editing the specified repair service
    public function edit($id)
    {
        // Return a view to edit an existing repair service
    }

    // Update the specified repair service in storage
    public function update(Request $request, $id)
    {
        $repairService = RepairService::find($id);
        if ($repairService) {
            $repairService->service_name = $request->service_name;
            $repairService->save();
            return response()->json($repairService);
        } else {
            return response()->json(['error' => 'Repair service not found'], 404);
        }
    }

    // Remove the specified repair service from storage
    public function destroy($id)
    {
        $repairService = RepairService::find($id);
        if ($repairService) {
            $repairService->delete();
            return response()->json(['message' => 'Repair service deleted successfully']);
        } else {
            return response()->json(['error' => 'Repair service not found'], 404);
        }
    }
}
