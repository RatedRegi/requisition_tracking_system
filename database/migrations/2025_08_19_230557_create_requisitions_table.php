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
        Schema::create('requisitions', function (Blueprint $table) {
            $table->id('req_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('dept_id');
            $table->string('title', 150);
            $table->text('justification');
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected', 'fulfilled'])->default('pending');
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('dept_id')->references('dept_id')->on('departments')->onDelete('cascade');
            
            // Indexes for better performance
            $table->index('status');
            $table->index('dept_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisitions');
    }
};
