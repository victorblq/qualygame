import { BadgeApply } from './BadgeApply';
import { BadgeCondition } from './BadgeCondition';

export class Badge
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private name: string;

    /**
     * 
     */
    private value: number;

    /**
     * 
     */
    private apply: BadgeApply;

    /**
     * 
     */
    private condition: BadgeCondition;

    /**
     * 
     */
    private icon: string;

    /**
     * 
     */
    private description: string;
    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param name 
     * @param value 
     * @param apply 
     * @param condition 
     * @param icon 
     * @param description 
     */
    constructor(
        name?: string,
        value?: number,
        apply?: string,
        condition?: string,
        icon?: string,
        description?: string
    )
    {
        this.name = name;
        this.value = value;
        this.apply = BadgeApply[apply];
        this.condition = BadgeCondition[condition];
        this.icon = icon;
        this.description = description;
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
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
    public get $value(): number
    {
        return this.value;
    }

    /**
     * 
     */
    public set $value( value: number )
    {
        this.value = value;
    }

    /**
     * 
     */
    public get $apply(): BadgeApply
    {
        return this.apply;
    }

    /**
     * 
     */
    public set $apply( value: BadgeApply )
    {
        this.apply = value;
    }

    /**
     * 
     */
    public get $condition(): BadgeCondition
    {
        return this.condition;
    }

    /**
     * 
     */
    public set $condition( value: BadgeCondition )
    {
        this.condition = value;
    }

    /**
     * 
     */
    public get $icon(): string
    {
        return this.icon;
    }

    /**
     * 
     */
    public set $icon( value: string )
    {
        this.icon = value;
    }

    /**
     * 
     */
    public get $description(): string
    {
        return this.description;
    }

    /**
     * 
     */
    public set $description( value: string )
    {
        this.description = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
    public toFirebase(): {}
    {
        return {
            name: this.name,
            value: this.value,
            apply: BadgeApply[this.apply],
            condition: BadgeCondition[this.condition],
            icon: this.icon,
            description: this.description
        };
    }
}