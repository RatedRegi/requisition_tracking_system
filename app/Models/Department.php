<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'dept_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'dept_name',
        'description',
    ];

    /**
     * Get the users that belong to this department.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'dept_id', 'dept_id');
    }

    /**
     * Get the requisitions from this department.
     */
    public function requisitions()
    {
        return $this->hasMany(Requisition::class, 'dept_id', 'dept_id');
    }

    /**
     * Get the department head (approver role user).
     */
    public function departmentHead()
    {
        return $this->hasOne(User::class, 'dept_id', 'dept_id')
                    ->where('role', 'approver');
    }

    /**
     * Get the total number of requisitions for this department.
     */
    public function getTotalRequisitionsAttribute()
    {
        return $this->requisitions()->count();
    }

    /**
     * Get the pending requisitions for this department.
     */
    public function getPendingRequisitionsAttribute()
    {
        return $this->requisitions()->where('status', 'pending')->count();
    }

    /**
     * Get the approved requisitions for this department.
     */
    public function getApprovedRequisitionsAttribute()
    {
        return $this->requisitions()->where('status', 'approved')->count();
    }

    /**
     * Get the rejected requisitions for this department.
     */
    public function getRejectedRequisitionsAttribute()
    {
        return $this->requisitions()->where('status', 'rejected')->count();
    }
}
