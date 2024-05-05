<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairService extends Model
{
    use HasFactory;

    protected $table = 'repair_services';

    protected $fillable = [
        'service_name',
    ];

    // Define the relationship with the ServicePrice model
    public function servicePrices()
    {
        return $this->hasMany(ServicePrice::class);
    }
}
