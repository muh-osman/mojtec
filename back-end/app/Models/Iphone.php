<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Iphone extends Model
{
    use HasFactory;

    protected $table = 'iphones';

    protected $fillable = [
        'model',
    ];

    // Define the relationship with the ServicePrice model
    public function servicePrices()
    {
        return $this->hasMany(ServicePrice::class);
    }
}
