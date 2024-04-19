<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('polres');
            $table->text('tujuan_laporan');
            $table->text('dikeluarkan');
            $table->text('nama_unit');
            $table->text('pemimpin_unit');
            $table->text('nrp_pemimpin_unit');
            $table->text('tembusan_1');
            $table->text('tembusan_2');
            $table->text('tembusan_3');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
