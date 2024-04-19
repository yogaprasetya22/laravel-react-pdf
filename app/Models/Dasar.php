<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dasar extends Model
{
    use HasFactory;
    protected $primaryKey = 'uuid'; // Tentukan 'uuid' sebagai primary key

    protected $keyType = 'string'; // Tentukan tipe data primary key sebagai string (UUID)

    public $incrementing = false; // Tandai bahwa primary key tidak bersifat inkremental

    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'laporan_uuid',
        'dasar',
    ];

    public function laporan()
    {
        return $this->belongsTo(Laporan::class);
    }
}
