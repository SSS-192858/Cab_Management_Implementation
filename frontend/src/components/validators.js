export const emailValidator = email => {
    if (!email) {
      return "Email is required";
    } else if (!new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])").test(email)) {
      return "Incorrect email format";
    }
    return "";
};
  
export const stringValidator = string => {
    if (!string) {
      return "Required field";
    }
    return "";
};

export const phoneValidator = phone => {
    if (!phone) {
        return "Phone is required"
    }else if (!new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$").test(phone)){
        return "Invalid phone number format"
    }
    return "";
}
  
  