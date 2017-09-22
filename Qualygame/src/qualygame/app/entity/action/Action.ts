export class Action
{
    /*===================================================================
     *                             ATTRIBUTES
     *===================================================================*/
    /**
     * 
     */
    private key: string;

    /**
     * 
     */
    private name: string;

    /**
     * 
     */
    private pontuation: number;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    constructor( key: string );
    constructor( key: string, name: string, pontuation: number );

    constructor(
        key?: string,
        name?: string,
        pontuation?: number
    )
    {
        this.key = key;
        this.name = name;
        this.pontuation = pontuation;
    }
    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/

    public get $key(): string
    {
        return this.key;
    }

    public set $key( value: string )
    {
        this.key = value;
    }

    public get $name(): string
    {
        return this.name;
    }

    public set $name( value: string )
    {
        this.name = value;
    }

    public get $pontuation(): number
    {
        return this.pontuation;
    }

    public set $pontuation( value: number )
    {
        this.pontuation = value;
    }

    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
}