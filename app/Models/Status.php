<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }
}
