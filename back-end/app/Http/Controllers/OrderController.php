<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'phone_number' => 'required|max:255',
            'address' => 'required|max:255',
            // تأكد من أن 'services' هي مصفوفة وليست مطلوبة
            'services' => 'sometimes|array',
            'total' => 'required|max:255',
            'model' => 'required|max:255',
            'notes' => 'nullable'
        ]);

        // تحويل مصفوفة الخدمات إلى سلسلة نصية مفصولة بفواصل
        if (isset($validatedData['services'])) {
            $validatedData['services'] = implode(', ', $validatedData['services']);
        }

        $order = Order::create($validatedData);
        return response()->json($order, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
