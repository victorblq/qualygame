export class Artifact
{

    /*===================================================================
    *                             ATTRIBUTES
    *===================================================================*/
    /**
     * 
     */
    private code: string;

    /**
     * 
     */
    private name: string;

    /**
     * 
     */
    private weight: number;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param code 
     * @param name 
     * @param weight 
     */
    constructor(
        code?: string,
        name?: string,
        weight?: number
    )
    {
        this.code = code;
        this.name = name
        this.weight = weight;
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    /**
     * 
     */
    public get $code(): string
    {
        return this.code;
    }

    /**
     * 
     */
    public set $code( value: string )
    {
        this.code = value;
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
    public get $weight(): number
    {
        return this.weight;
    }

    /**
     * 
     */
    public set $weight( value: number )
    {
        this.weight = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
}