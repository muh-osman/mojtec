<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicePrice extends Model
{
    use HasFactory;

    protected $table = 'service_prices';

    protected $fillable = [
        'iphone_id',
        'repair_service_id',
        'price',
    ];

    public function iphone()
    {
        return $this->belongsTo(Iphone::class);
    }

    public function repairService()
    {
        return $this->belongsTo(RepairService::class);
    }
}
