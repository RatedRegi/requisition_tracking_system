<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'role',
        'dept_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the department that the user belongs to.
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id', 'dept_id');
    }

    /**
     * Get the requisitions created by the user.
     */
    public function requisitions()
    {
        return $this->hasMany(Requisition::class, 'user_id', 'user_id');
    }

    /**
     * Get the approvals made by the user.
     */
    public function approvals()
    {
        return $this->hasMany(Approval::class, 'approver_id', 'user_id');
    }

    /**
     * Check if the user has a specific role.
     */
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Check if the user is an approver.
     */
    public function isApprover()
    {
        return $this->role === 'approver';
    }

    /**
     * Check if the user is a procurement officer.
     */
    public function isProcurement()
    {
        return $this->role === 'procurement';
    }
}
