export class CommitedArtifactError
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
    private message: string;

    /*===================================================================
     *                            CONSTRUCTOR
     *===================================================================*/
    /**
     * 
     * @param code 
     * @param message 
     */
    constructor(
        code: string,
        message: string
    )
    {
        this.code = code;
        this.message = message;
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
    public get $message(): string
    {
        return this.message;
    }

    /**
     * 
     */
    public set $message( value: string )
    {
        this.message = value;
    }
    /*===================================================================
     *                             BEHAVIOUR
     *===================================================================*/
}