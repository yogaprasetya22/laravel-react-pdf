<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "polres",
        "tujuan_laporan",
        "dikeluarkan",
        "nama_unit",
        "pemimpin_unit",
        "nrp_pemimpin_unit",
        "tembusan_1",
        "tembusan_2",
        "tembusan_3",
    ];

    protected $table = 'templates';
}
