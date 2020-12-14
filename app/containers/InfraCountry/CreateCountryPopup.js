import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../components/Popup';
import axios from 'axios';
import FormField from '../../components/FormGroup';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import ErrorText from '../../components/ErrorText';
import SelectInput from 'components/SelectInput';
import FormGroup from 'components/FormGroup';
// import notify from '../../components/Notify';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

function CreateCountryPopup(props) {
  const [countryList, setCountryList] = React.useState([]);
  const [countryname, setcountryname] = React.useState("");
  useEffect(() => {
    axios
      .get(`${API_URL}/get-country`)
      .then(d => {
        console.log(d);
        if ((d.status = 200)) {
          console.log(d.data);
          if (d.data.data[0].country_list.length != 0) {
            console.log(d.data.data[0].country_list);
            setCountryList(d.data.data[0].country_list);

          }
        }
      })
      .catch(err => {
        console.log(err.messages);
      });
  }, []);

  const inputFocus = (e) => {
    const { target } = e;
    target.parentElement.querySelector('label').classList.add('focused');
  }

  const inputBlur = (e) => {
    const { target } = e;
    if (target.value == '') {
      target.parentElement.querySelector('label').classList.remove('focused');
    }
  }

  const saveCountry = async (props, values) => {
    console.log(countryList)
    const filterdata = countryList.filter((cvalue) => {
      return cvalue.name.toLowerCase() == countryname.toLowerCase()
    })
    if (filterdata.length == 0) {
      values.name = countryname
      try {
        const res = await axios.post(`${API_URL}/save-country`, {
          ...values,
        });
        console.log(res);
        if (res.status === 200) {
          if (res.data.status === 0) {
          } else {
            props.refreshcountrylist();
            props.onClose();
          }
        } else {
          //   notify(res.data.message, 'error');
        }
      } catch (e) {
        // notify('Something went wrong');
      }
    }
    else {
      console.log("fouhd")
      alert("Duplicate Entry")
      // notify('Duplicate Entry');
      props.onClose();


    }

  };

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <h1>Add Country</h1>
      <Formik
        initialValues={{
          ccode: '',
          name: '',
        }}
        onSubmit={async (values) => {
          await saveCountry(props, values);
        }}
      >
        {(formikProps) => {
          const { isSubmitting, handleChange, handleBlur } = formikProps;
          return (
            <div>
              <Form>
                <FormGroup>

                  <SelectInput
                    type="text"
                    name="country"
                    // value={this.state.country}
                    onChange={(e) => {
                      setcountryname(e.target.value)
                    }}
                    required
                    autoFocus
                  >
                    <option title="" value="">Select Country*</option>
                    <option title="+213">Algeria</option>
                    <option title="+376">Andorra</option>
                    <option title="+244">Angola</option>
                    <option title="+1264">Anguilla</option>
                    <option title="+1268">Antigua &amp; Barbuda</option>
                    <option title="+54">Argentina</option>
                    <option title="+374">Armenia</option>
                    <option title="+297">Aruba</option>
                    <option title="+61">Australia</option>
                    <option title="+43">Austria</option>
                    <option title="+994">Azerbaijan</option>
                    <option title="+1242">Bahamas</option>
                    <option title="+973">Bahrain</option>
                    <option title="+880">Bangladesh</option>
                    <option title="+1246">Barbados</option>
                    <option title="+375">Belarus</option>
                    <option title="+32">Belgium</option>
                    <option title="+501">Belize</option>
                    <option title="+229">Benin</option>
                    <option title="+1441">Bermuda</option>
                    <option title="+975">Bhutan</option>
                    <option title="+591">Bolivia</option>
                    <option title="+387">Bosnia Herzegovina</option>
                    <option title="+267">Botswana</option>
                    <option title="+55">Brazil</option>
                    <option title="+673">Brunei</option>
                    <option title="+359">Bulgaria</option>
                    <option title="+226">Burkina Faso</option>
                    <option title="+257">Burundi</option>
                    <option title="+855">Cambodia</option>
                    <option title="+237">Cameroon</option>
                    <option title="+1">Canada</option>
                    <option title="+238">Cape Verde Islands</option>
                    <option title="+1345">Cayman Islands</option>
                    <option title="+236">Central African Republic</option>
                    <option title="+56">Chile</option>
                    <option title="+86">China</option>
                    <option title="+57">Colombia</option>
                    <option title="+269">Comoros</option>
                    <option title="+242">Congo</option>
                    <option title="+682">Cook Islands</option>
                    <option title="+506">Costa Rica</option>
                    <option title="+385">Croatia</option>
                    <option title="+53">Cuba</option>
                    <option title="+90392">Cyprus North</option>
                    <option title="+357">Cyprus South</option>
                    <option title="+42">Czech Republic</option>
                    <option title="+45">Denmark</option>
                    <option title="+253">Djibouti</option>
                    <option title="+1809">Dominica</option>
                    <option title="+1809">Dominican Republic</option>
                    <option title="+593">Ecuador</option>
                    <option title="+20">Egypt</option>
                    <option title="+503">El Salvador</option>
                    <option title="+240">Equatorial Guinea</option>
                    <option title="+291">Eritrea</option>
                    <option title="+372">Estonia</option>
                    <option title="+251">Ethiopia</option>
                    <option title="+500">Falkland Islands</option>
                    <option title="+298">Faroe Islands</option>
                    <option title="+679">Fiji</option>
                    <option title="+358">Finland</option>
                    <option title="+33">France</option>
                    <option title="+594">French Guiana</option>
                    <option title="+689">French Polynesia</option>
                    <option title="+241">Gabon</option>
                    <option title="+220">Gambia</option>
                    <option title="+7880">Georgia</option>
                    <option title="+49">Germany</option>
                    <option title="+233">Ghana</option>
                    <option title="+350">Gibraltar</option>
                    <option title="+30">Greece</option>
                    <option title="+299">Greenland</option>
                    <option title="+1473">Grenada</option>
                    <option title="+590">Guadeloupe</option>
                    <option title="+671">Guam</option>
                    <option title="+502">Guatemala</option>
                    <option title="+224">Guinea</option>
                    <option title="+245">Guinea - Bissau</option>
                    <option title="+592">Guyana</option>
                    <option title="+509">Haiti</option>
                    <option title="+504">Honduras</option>
                    <option title="+852">Hong Kong</option>
                    <option title="+36">Hungary</option>
                    <option title="+354">Iceland</option>
                    <option title="+91">India</option>
                    <option title="+62">Indonesia</option>
                    <option title="+98">Iran</option>
                    <option title="+964">Iraq</option>
                    <option title="+353">Ireland</option>
                    <option title="+972">Israel</option>
                    <option title="+39">Italy</option>
                    <option title="+1876">Jamaica</option>
                    <option title="+81">Japan</option>
                    <option title="+962">Jordan</option>
                    <option title="+7">Kazakhstan</option>
                    <option title="+254">Kenya</option>
                    <option title="+686">Kiribati</option>
                    <option title="+850">Korea North</option>
                    <option title="+82">Korea South</option>
                    <option title="+965">Kuwait</option>
                    <option title="+996">Kyrgyzstan</option>
                    <option title="+856">Laos</option>
                    <option title="+371">Latvia</option>
                    <option title="+961">Lebanon</option>
                    <option title="+266">Lesotho</option>
                    <option title="+231">Liberia</option>
                    <option title="+218">Libya</option>
                    <option title="+417">Liechtenstein</option>
                    <option title="+370">Lithuania</option>
                    <option title="+352">Luxembourg</option>
                    <option title="+853">Macao</option>
                    <option title="+389">Macedonia</option>
                    <option title="+261">Madagascar</option>
                    <option title="+265">Malawi</option>
                    <option title="+60">Malaysia</option>
                    <option title="+960">Maldives</option>
                    <option title="+223">Mali</option>
                    <option title="+356">Malta</option>
                    <option title="+692">Marshall Islands</option>
                    <option title="+596">Martinique</option>
                    <option title="+222">Mauritania</option>
                    <option title="+269">Mayotte</option>
                    <option title="+52">Mexico</option>
                    <option title="+691">Micronesia</option>
                    <option title="+373">Moldova</option>
                    <option title="+377">Monaco</option>
                    <option title="+976">Mongolia</option>
                    <option title="+1664">Montserrat</option>
                    <option title="+212">Morocco</option>
                    <option title="+258">Mozambique</option>
                    <option title="+95">Myanmar</option>
                    <option title="+264">Namibia</option>
                    <option title="+674">Nauru</option>
                    <option title="+977">Nepal</option>
                    <option title="+31">Netherlands</option>
                    <option title="+687">New Caledonia</option>
                    <option title="+64">New Zealand</option>
                    <option title="+505">Nicaragua</option>
                    <option title="+227">Niger</option>
                    <option title="+234">Nigeria</option>
                    <option title="+683">Niue</option>
                    <option title="+672">Norfolk Islands</option>
                    <option title="+670">Northern Marianas</option>
                    <option title="+47">Norway</option>
                    <option title="+968">Oman</option>
                    <option title="+680">Palau</option>
                    <option title="+507">Panama</option>
                    <option title="+675">Papua New Guinea</option>
                    <option title="+595">Paraguay</option>
                    <option title="+51">Peru</option>
                    <option title="+63">Philippines</option>
                    <option title="+48">Poland</option>
                    <option title="+351">Portugal</option>
                    <option title="+1787">Puerto Rico</option>
                    <option title="+974">Qatar</option>
                    <option title="+262">Reunion</option>
                    <option title="+40">Romania</option>
                    <option title="+7">Russia</option>
                    <option title="+250">Rwanda</option>
                    <option title="+378">San Marino</option>
                    <option title="+239">Sao Tome &amp; Principe</option>
                    <option title="+966">Saudi Arabia</option>
                    <option title="+221">Senegal</option>
                    <option title="+381">Serbia</option>
                    <option title="+248">Seychelles</option>
                    <option title="+232">Sierra Leone</option>
                    <option title="+65">Singapore</option>
                    <option title="+421">Slovak Republic</option>
                    <option title="+386">Slovenia</option>
                    <option title="+677">Solomon Islands</option>
                    <option title="+252">Somalia</option>
                    <option title="+27">South Africa</option>
                    <option title="+34">Spain</option>
                    <option title="+94">Sri Lanka</option>
                    <option title="+290">St. Helena</option>
                    <option title="+1869">St. Kitts</option>
                    <option title="+1758">St. Lucia</option>
                    <option title="+249">Sudan</option>
                    <option title="+597">Suriname</option>
                    <option title="+268">Swaziland</option>
                    <option title="+46">Sweden</option>
                    <option title="+41">Switzerland</option>
                    <option title="+963">Syria</option>
                    <option title="+886">Taiwan</option>
                    <option title="+7">Tajikstan</option>
                    <option title="+66">Thailand</option>
                    <option title="+228">Togo</option>
                    <option title="+676">Tonga</option>
                    <option title="+1868">Trinidad &amp; Tobago</option>
                    <option title="+216">Tunisia</option>
                    <option title="+90">Turkey</option>
                    <option title="+7">Turkmenistan</option>
                    <option title="+993">Turkmenistan</option>
                    <option title="+1649">Turks &amp; Caicos Islands</option>
                    <option title="+688">Tuvalu</option>
                    <option title="+256">Uganda</option>
                    <option title="+44">UK</option>
                    <option title="+380">Ukraine</option>
                    <option title="+971">United Arab Emirates</option>
                    <option title="+598">Uruguay</option>
                    <option title="+1">USA</option>
                    <option title="+7">Uzbekistan</option>
                    <option title="+678">Vanuatu</option>
                    <option title="+379">Vatican City</option>
                    <option title="+58">Venezuela</option>
                    <option title="+84">Vietnam</option>
                    <option title="+84">Virgin Islands - British</option>
                    <option title="+84">Virgin Islands - US</option>
                    <option title="+681">Wallis &amp; Futuna</option>
                    <option title="+969">Yemen</option>
                    <option title="+967">Yemen</option>
                    <option title="+260">Zambia</option>
                    <option title="+263">Zimbabwe</option>
                  </SelectInput>
                </FormGroup>

                {/* <FormField textAlign="start" mB="14px" background="#fff">
                  <label htmlFor="cdays">Name*</label>
                  <Field
                    type="text"
                    name="name"
                    onFocus={(e) => {
                      handleChange(e);
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="name" component={ErrorText} />
                </FormField> */}
                <FormField mB="14px" background="#fff">
                  <label htmlFor="name">Country Code*</label>
                  <Field
                    type="text"
                    name="ccode"
                    onFocus={(e) => {
                      inputFocus(e);
                    }}
                    onBlur={(e) => {
                      inputBlur(e);
                    }}
                    as={TextInput}
                    required
                  />
                  <ErrorMessage name="ccode" component={ErrorText} />
                </FormField>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  filledBtn
                  marginTop="10px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                      <span>AddCountry</span>
                    )}
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default CreateCountryPopup;
