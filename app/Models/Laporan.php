<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    protected $primaryKey = 'uuid'; // Tentukan 'uuid' sebagai primary key

    protected $keyType = 'string'; // Tentukan tipe data primary key sebagai string (UUID)

    public $incrementing = false; // Tandai bahwa primary key tidak bersifat inkremental

    protected $fillable = [
        'uuid',
        'user_id',
        'uuid_user',
        'file',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function no_sprin()
    {
        return $this->hasOne(NoSprin::class);
    }

    public function pertimbangan()
    {
        return $this->hasOne(Pertimbangan::class);
    }

    public function dasar()
    {
        return $this->hasMany(Dasar::class);
    }

    public function kepada()
    {
        return $this->hasMany(Kepada::class);
    }

    public function untuk()
    {
        return $this->hasMany(Untuk::class);
    }

    public function surat_perintah()
    {
        return $this->hasOne(SuratPerintah::class);
    }

    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }
}
