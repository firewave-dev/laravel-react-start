<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case OPERATOR = 'operator';
    case MANAGER = 'manager';
    case MEMBER = 'member';

    /**
     * Get all role values as an array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get role label for display
     */
    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::OPERATOR => 'Operator',
            self::MANAGER => 'Manager',
            self::MEMBER => 'Member',
        };
    }

    /**
     * Check if role is admin
     */
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    /**
     * Check if role has management privileges (admin, operator, manager)
     */
    public function canManage(): bool
    {
        return in_array($this, [self::ADMIN, self::OPERATOR, self::MANAGER]);
    }

    /**
     * Check if role can access specific features
     */
    public function hasPermission(string $permission): bool
    {
        return match($permission) {
            'manage_users' => $this === self::ADMIN,
            'manage_content' => $this->canManage(),
            'view_dashboard' => true, // All roles can view dashboard
            default => false,
        };
    }
}

