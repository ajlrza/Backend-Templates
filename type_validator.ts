type Validator = { validate: (val: unknown) => boolean };

class StringValidator {
  validate(val: unknown): boolean {
    return typeof val === "string";
  }
}

class NumValidator {
    validate(val: unknown): boolean {
        return typeof val === "number"
    }
}

class BooleanValidator {
  validate(val: unknown): boolean {
    return typeof val === "boolean";
  }
}

class ObjectValidator {
    validate(val: unknown): boolean {
        return typeof val === "object";
    }
}

class RecordValidator {
    validate(val: unknown): boolean {
        return typeof val === 'object' && typeof val !== null && !Array.isArray(val)
    }
}

const nullableValidator = (inner: Validator): Validator => ({
  validate: (val) => val === null || inner.validate(val)
})

function checkActionData(actionData: actionList): void {
    const movedData: any = actionData.isMoved;
    const talkData: any = actionData.isTalked;
    const touchData: any = actionData.isTouched;
};

const objValidate = new ObjectValidator()
const strValidate = new StringValidator()
const numValidate = new NumValidator()
const recValidate = new RecordValidator()
const boolValidate = new BooleanValidator()

export function checkMainData(data: any): Record<string, mainValid | linkerValid | strStatesValid | numStatesValid> {

    const objValid: mainValid = {
        "REPLACETYPE": objValidate.validate(data.REPLACETYPE),
        "REPLACETYPE": objValidate.validate(data.REPLACETYPE),
        "REPLACETYPE": objValidate.validate(data.REPLACETYPE), 
        "REPLACETYPE": objValidate.validate(data.REPLACETYPE), 
        "defined": [
            data.REPLACETYPE ?? undefined,
            data.REPLACETYPE ?? undefined,
            data.REPLACETYPE ?? undefined,
            data.REPLACETYPE ?? undefined
        ],
    }

    const strValid: strStatesValid = {
        "REPLACETYPE": strValidate.validate(states.State.StateOne) 
               && strValidate.validate(states.State.StateTwo) 
               && strValidate.validate(states.State.StateThree),
        "REPLACETYPE": strValidate.validate(states.Avatar.EmotionOne)
               && strValidate.validate(states.Avatar.EmotionTwo)
               && strValidate.validate(states.Avatar.EmotionThree),
    }

    const numValid: numStatesValid= {
       "REPLACETYPE": numValidate.validate(states.Position.x)
               && numValidate.validate(states.Position.y)
               && numValidate.validate(states.Position.z),
    }

    const linkerValid: linkerValid = {
        "REPLACETYPE": objValidate.validate(states.State?.StateLinker),
        "REPLACETYPE": objValidate.validate(states.Avatar?.StateLinker),
        "REPLACETYPE": objValidate.validate(states.Position?.StateLinker),
        "REPLACETYPE": objValidate.validate(states.World?.StateLinker),
        "defined": [
            states.REPLACETYPE.StateLinker ?? undefined,
            states.REPLACETYPE.StateLinker ?? undefined,
            states.REPLACETYPE.StateLinker ?? undefined,
            states.REPLACETYPE.StateLinker ?? undefined
        ]
    }

    return {
        "mainValid": objValid,
        "linkerValid": linkerValid,
        "strValid": strValid,
        "numValid": numValid
    }
    
};

export function checkExtSingle(extData: REPLACETYPEEXT | REPLACETYPEEXT | REPLACETYPEEXT | REPLACETYPEEXT): boolean | Record<string, boolean> {

    if (!extData || typeof extData !== 'object')  {  
        return false
    }

    const extObjValid: boolean = objValidate.validate(extData)
    const extRecordsValid: boolean = recValidate.validate(extData.extStates)

    return {
        "extObj": extObjValid,
        "extRec": extRecordsValid
    }

}

export function checkExtRecord(extData: extPayload | undefined): boolean | Record<string, extValid> {

    if (!extData || typeof extData !== 'object')  {  
        return false
    }

    const extObjValid: extValid = {
        "REPLACETYPEEXT": objValidate.validate(extData.genExt),
        "REPLACETYPEEXT": objValidate.validate(extData.avtExt),
        "REPLACETYPEEXT": objValidate.validate(extData.pstExt), 
        "REPLACETYPEEXT": objValidate.validate(extData.worldExt), 
        "defined": [
            extData.REPLACETYPEEXT ?? undefined,
            extData.REPLACETYPEEXT ?? undefined,
            extData.REPLACETYPEEXT ?? undefined,
            extData.REPLACETYPEEXT ?? undefined
        ]
    };

    const extRecordsValid: extValid = {
        "REPLACETYPEEXT": recValidate.validate(extData.REPLACETYPEEXT.extStates),
        "REPLACETYPEEXT": recValidate.validate(extData.REPLACETYPEEXT.extStates),
        "REPLACETYPEEXT": recValidate.validate(extData.REPLACETYPEEXT.extStates),
        "REPLACETYPEEXT": recValidate.validate(extData.REPLACETYPEEXT.extStates)
    }

    return {
        "extObj": extObjValid,
        "extRec": extRecordsValid
    }
}
