export interface Abc {
    timestamp: string;
    direction: '<<' | ">>";
    A: string
    B: string
    C: string
}

export interface Event {
    _T: 'LogPlayerTakeDamage' |
    'LogWeaponFireCount' | 'LogPlayerPosition' | 'LogItemEquip' | 'LogItemUnequip' | 'LogItemPickup' | 'LogItemDrop' | 'LogPlayerLogin' | 'LogPlayerLogout' | 'LogMatchDefinition' | 'LogMatchStart' | 'LogMatchEnd' | 'LogVehicleDestroy' | 'LogPlayerKill' | 'LogPlayerRevive' | 'LogSwimEnd' | 'LogSwimStart' | 'LogParachuteLanding' | 'LogParachuteDeploy';
}

export interface LogPlayerTakeDamage {
    attackId: number;
    attacker?: {
        name: string;
        teamId: number;
        health: number;
        location: {
            x: number;
            y: number;
            z: number;
        };
        ranking: number;
        individualRanking: number;
        accountId: string;
        isInBlueZone: boolean;
        isInRedZone: boolean;
        inSpecialZone: string;
        isInVehicle: boolean;
        zone: string[];
        type: string;
    };
    victim?: {
        name: string;
        teamId: number;
        health: number;
        location: {
            x: number;
            y: number;
            z: number;
        };
        ranking: number;
        individualRanking: number;
        accountId: string;
        isInBlueZone: boolean;
        isInRedZone: boolean;
        inSpecialZone: string;
        isInVehicle: boolean;
        zone: string[];
        type: string;
    };
    damageTypeCategory: 'Damage_VehicleCrashHit' | 'Damage_Gun' | 'Damage_Groggy';
    damageReason: string;
    damage: number;
    damageCauserName: string;
    isThroughPenetrableWall: boolean;
    common: {
        isGame: number;
    };
    _D: string;
    _T: string;
}

export interface LogPlayerTakeDamage {
    attackId: number;
    attacker?: {
        name: string;
        teamId: number;
        health: number;
        location: {
            x: number;
            y: number;
            z: number;
        };
        ranking: number;
        individualRanking: number;
        accountId: string;
        isInBlueZone: boolean;
        isInRedZone: boolean;
        inSpecialZone: string;
        isInVehicle: boolean;
        zone: string[];
        type: string;
    };
    victim?: {
        name: string;
        teamId: number;
        health: number;
        location: {
            x: number;
            y: number;
            z: number;
        };
        ranking: number;
        individualRanking: number;
        accountId: string;
        isInBlueZone: boolean;
        isInRedZone: boolean;
        inSpecialZone: string;
        isInVehicle: boolean;
        zone: string[];
        type: string;
    };
    damageTypeCategory: 'Damage_VehicleCrashHit' | 'Damage_Gun' | 'Damage_Groggy';
    damageReason: string;
    damage: number;
    damageCauserName: string;
    isThroughPenetrableWall: boolean;
    common: {
        isGame: number;
    };
    _D: string;
    _T: string;
}

export interface LogPlayerRevive {

}

export interface LogPlayerMakeGroggy { }

export interface LogPlayerKillV2 { }

export interface LogPlayerUseThrowable { }