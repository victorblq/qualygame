export class CommitedArtifactError
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
     * @param key 
     * @param code 
     * @param message 
     */
    constructor(
        key: string,
        code: string,
        message: string
    )
    {
        this.key = key;
        this.code = code;
        this.message = message;
    }

    /*===================================================================
     *                         GETTERS AND SETTERS
     *===================================================================*/
    /**
     * 
     */
    public get $key(): string 
    {
		return this.key;
	}

    /**
     * 
     */
    public set $key(value: string) 
    {
		this.key = value;
	}
    
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