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
        Schema::create('kepadas', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->uuid('laporan_uuid');
            $table->foreign('laporan_uuid')->references('uuid')->on('laporans');
            $table->string('nama');
            $table->string('pangkat');
            $table->string('picked');
            $table->string('nrp');
            $table->string('jabatan');
            $table->text('tugas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kepadas');
    }
};
