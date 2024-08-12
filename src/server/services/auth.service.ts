import { envs } from "../../config";
import { UserModel } from "../../data";
import { EmailService, JWT, bcrypt } from "../../plugins";
import {
  CustomError,
  RegisterUserDTO,
  UserEntity,
  loginUserDTO,
} from "../../rules";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async loginUser(DTO: loginUserDTO) {
    const userdb = await UserModel.findOne({ email: DTO.email });
    if (!userdb) throw CustomError.unAuthorized("User not exist");
    if (!bcrypt.compare(DTO.password, userdb.password))
      throw CustomError.unAuthorized(`Password not match`);
    try {
      const { password, ...user } = UserEntity.fromObject(userdb);

      return {
        token: await JWT.generateToken({ email: user.email, id: user.id }),
        user,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async registerUser(DTO: RegisterUserDTO) {
    if (await UserModel.findOne({ email: DTO.email }))
      throw CustomError.badRequest("Email already exist");
    try {
      await this.sendEmail(DTO.email);

      const { password, ...user } = UserEntity.fromObject(
        await new UserModel({
          ...DTO,
          password: bcrypt.hash(DTO.password),
        }).save()
      );
      return {
        token: await JWT.generateToken({ email: user.email, id: user.id }),
        user,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async validate(token: string) {
    try {
      const {to:email}=await JWT.validateToken(token) as {[key:string]:any};
      await UserModel.findOneAndUpdate({email},{emailValidated:true});
      return true
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmail = async (to: string) => {
    const token = await JWT.generateToken({ to });
    if (!token) throw `Error getting token`;
    try {
      this.emailService.sendEmail({
        to,
        subject: "Validacion de correo",
        html: `
      <h3>Para validar su cuenta acceda al siguiente link</h3>
      <a href="${envs.WEBSERVICE_URL}api/auth/validate-email/${token}">Validate your email ${to}</a>
      `,
      });
    } catch (error) {
      throw `Error al enviar el correo`;
    }
  };
}
