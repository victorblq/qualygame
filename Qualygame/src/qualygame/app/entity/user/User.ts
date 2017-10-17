import { Pontuation } from './../pontuation/Pontuation';
import { Badge } from './../badge/Badge';
import { UserProfile } from './UserProfile'; 
import { UserStatus } from './UserStatus'; 

export class User
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/

    /**
     * 
     */
    private nickname: string;

    /**
     * 
     */
    private name: string;

    /**
     * 
     */
    private email: string;

    /**
     * 
     */
    private birthDate: Date;

    /**
     * 
     */
    private photo: string;

    /**
     * 
     */
    private status: UserStatus;

    /**
     * 
     */
    private profile: UserProfile;

    /**
     * 
     */
    private badges: Array<Badge>;

    /**
     * 
     */
    private pontuation: Array<Pontuation>;

    /**
     * 
     */
    private totalPontuation: number;

    /**
     * 
     */
    private level: number;
    /*===================================================================
     *                         CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param user 
     */
    public constructor(
        nickname?: string,
        email?: string,
        profile?: number,
        status?: string,
        name?: string,
        totalPontuation?: string,
        photo?: string,
        level?: number
    )
    {
        this.nickname = nickname;
        this.email = email;
        this.profile = UserProfile[UserProfile[profile]];
        this.status = UserStatus[status];
        this.name = name;
        this.totalPontuation = +totalPontuation;
        this.photo = photo;
        this.level = level;
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    /**
     * 
     */
    public get $nickname(): string
    {
        return this.nickname;
    }

    /**
     * 
     */
    public set $nickname( value: string )
    {
        this.nickname = value;
    }

    /**
     * 
     */
    public get $name(): string
    {
        return this.name;
    }

    /**
     * 
     */
    public set $name( value: string )
    {
        this.name = value;
    }

    /**
     * 
     */
    public get $email(): string
    {
        return this.email;
    }

    /**
     * 
     */
    public set $email( value: string )
    {
        this.email = value;
    }

    /**
     * 
     */
    public get $birthDate(): Date
    {
        return this.birthDate;
    }

    /**
     * 
     */
    public set $birthDate( value: Date )
    {
        this.birthDate = value;
    }

    /**
     * 
     */
    public get $photo(): string
    {
        return this.photo;
    }

    /**
     * 
     */
    public set $photo( value: string )
    {
        this.photo = value;
    }

    /**
     * 
     */
    public get $status(): UserStatus
    {
        return this.status;
    }

    /**
     * 
     */
    public set $status( value: UserStatus )
    {
        this.status = value;
    }

    /**
     * 
     */
    public get $profile(): UserProfile
    {
        return this.profile;
    }

    /**
     * 
     */
    public set $profile( value: UserProfile )
    {
        this.profile = value;
    }

    /**
     * 
     */
    public get $badges(): Array<Badge>
    {
        return this.badges;
    }

    /**
     * 
     */
    public set $badges( value: Array<Badge> )
    {
        this.badges = value;
    }

    /**
     * 
     */
    public get $pontuation(): Array<Pontuation>
    {
        return this.pontuation;
    }

    /**
     * 
     */
    public set $pontuation( value: Array<Pontuation> )
    {
        this.pontuation = value;
    }

    /**
     * 
     */
    public get $totalPontuation(): number
    {
        return this.totalPontuation;
    }

    /**
     * 
     */
    public set $totalPontuation( value: number )
    {
        this.totalPontuation = value;
    }

    /**
     * 
     */
    public get $level(): number
    {
        return this.level;
    }

    /**
     * 
     */
    public set $level( value: number )
    {
        this.level = value;
    }


    /*===================================================================
     *                              BEHAVIOUR
     *===================================================================*/
    /**
     * 
     */
    public isPlayer(): boolean
    {
        return this.profile == UserProfile.PLAYER;
    }

    /**
     * 
     */
    public toFirebase(): {}
    {
        let user: any = {
            email: this.email,
            level: this.level,
            name: this.name,
            nickname: this.nickname,
            profile: UserProfile[UserProfile[this.profile]],
            status: UserStatus[UserStatus[this.status]],
            totalPontuation: this.totalPontuation,
        }

        if(this.photo != null)
        {
            user.photo = this.photo
        }

        if(this.pontuation != null)
        {
            user.pontuation = this.pontuation;
        }

        return user;
    }
}