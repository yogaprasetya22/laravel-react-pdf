<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function laporan()
    {
        return $this->belongsTo(Laporan::class);
    }
}
