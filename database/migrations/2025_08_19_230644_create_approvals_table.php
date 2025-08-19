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
        Schema::create('approvals', function (Blueprint $table) {
            $table->id('approval_id');
            $table->unsignedBigInteger('req_id');
            $table->unsignedBigInteger('approver_id');
            $table->enum('decision', ['approved', 'rejected', 'pending'])->default('pending');
            $table->text('comments')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->foreign('req_id')->references('req_id')->on('requisitions')->onDelete('cascade');
            $table->foreign('approver_id')->references('user_id')->on('users')->onDelete('cascade');
            
            // Index for better performance
            $table->index('req_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approvals');
    }
};
