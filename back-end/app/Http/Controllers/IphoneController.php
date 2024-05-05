<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Iphone;

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
        $iphone = new Iphone();
        $iphone->model = $request->model;
        $iphone->save();

        return response()->json($iphone, 201);
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

    // Remove the specified iPhone from storage
    public function destroy($id)
    {
        $iphone = Iphone::find($id);
        if ($iphone) {
            $iphone->delete();
            return response()->json(['message' => 'iPhone deleted successfully']);
        } else {
            return response()->json(['error' => 'iPhone not found'], 404);
        }
    }
}
