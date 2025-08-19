<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requisition extends Model
{
    use HasFactory;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'req_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'dept_id',
        'title',
        'justification',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who created the requisition.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Get the department that made the requisition.
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id', 'dept_id');
    }

    /**
     * Get the items in this requisition.
     */
    public function items()
    {
        return $this->hasMany(RequisitionItem::class, 'req_id', 'req_id');
    }

    /**
     * Get the approvals for this requisition.
     */
    public function approvals()
    {
        return $this->hasMany(Approval::class, 'req_id', 'req_id');
    }

    /**
     * Get the procurement record for this requisition.
     */
    public function procurement()
    {
        return $this->hasOne(Procurement::class, 'req_id', 'req_id');
    }

    /**
     * Get the latest approval for this requisition.
     */
    public function latestApproval()
    {
        return $this->hasOne(Approval::class, 'req_id', 'req_id')
                    ->latest();
    }

    /**
     * Check if the requisition is pending.
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the requisition is approved.
     */
    public function isApproved()
    {
        return $this->status === 'approved';
    }

    /**
     * Check if the requisition is rejected.
     */
    public function isRejected()
    {
        return $this->status === 'rejected';
    }

    /**
     * Check if the requisition is fulfilled.
     */
    public function isFulfilled()
    {
        return $this->status === 'fulfilled';
    }

    /**
     * Get the total cost of all items in this requisition.
     */
    public function getTotalCostAttribute()
    {
        return $this->items()->sum('total_price');
    }

    /**
     * Scope to get pending requisitions.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to get approved requisitions.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope to get rejected requisitions.
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope to get requisitions by department.
     */
    public function scopeByDepartment($query, $deptId)
    {
        return $query->where('dept_id', $deptId);
    }
}
