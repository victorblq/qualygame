import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';

@Component( {
    selector: 'confirm-dialog',
    template: `
    <md-toolbar color="primary">
        <p>{{ title }}</p>
    </md-toolbar>
    <div layout="column" style="padding: 0px 15px">
        <div layout="row" style="text-align: center; max-width: 400px;">
            <p>{{ message }}</p>    
        </div>

        <div layout="row" layout-align="end center">
            <button type="button" md-button 
                (click)="dialogRef.close()">{{cancelButton}}</button>
            <button type="button" md-raised-button 
                (click)="dialogRef.close(true)">{{okButton}}</button>
        </div>
    </div>
    `,
} )
export class ConfirmDialogComponent implements OnInit
{
    /**
     * 
     */
    public title: string;
    /**
     * 
     */
    public message: string;
    /**
     * 
     */
    public okButton: string;
    /**
     * 
     */
    public cancelButton: string;

    /**
     * 
     * @param dialogRef 
     * @param data 
     */
    constructor( 
        public dialogRef: MdDialogRef<ConfirmDialogComponent> ,
        @Inject(MD_DIALOG_DATA) private data: any 
    ){}

    ngOnInit()
    {
        this.title = this.data.title;
        this.message = this.data.message;
        this.okButton = this.data.okButton;
        this.cancelButton = this.data.cancelButton;
    }
}