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
        Schema::create('procurement', function (Blueprint $table) {
            $table->id('procurement_id');
            $table->unsignedBigInteger('req_id')->unique();
            $table->unsignedBigInteger('supplier_id')->nullable();
            $table->unsignedBigInteger('assigned_by');
            $table->date('expected_delivery_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('assigned_at')->useCurrent();
            $table->timestamps();

            $table->foreign('req_id')->references('req_id')->on('requisitions');
            $table->foreign('supplier_id')->references('supplier_id')->on('suppliers')->onDelete('set null');
            $table->foreign('assigned_by')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement');
    }
};
